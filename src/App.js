import React from 'react';
import './App.css';
import Display from './components/Display';
import Keys from './components/Keys';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstValue: '',
      operator: '',
      modValue: '',
      previousKeyType: '',
      displayedNum: '0'
    }
  }

  calculate = (n1, operator, n2) => {
    const firstNum = parseFloat(n1)
    const secondNum = parseFloat(n2)
    if (operator === '+') return (firstNum + secondNum).toString()
    if (operator === '-') return (firstNum - secondNum).toString()
    if (operator === '*') return (firstNum * secondNum).toString()
    if (operator === '/') return (firstNum / secondNum).toString()
  }

  getKeyType = key => {
    // '+num' returns the numeric value of the string, or NaN if isn't
    if (!isNaN(+key)) return 'number'
    if (key === '+' || key === '-' || key === '*' || key === '/') return 'operator'
    if (key === '.') return 'decimal'
    if (key === 'CE') return 'clear'
    if (key === '=') return 'calculate'
  }

  // returns the value that needs to be displayed
  createResultString = (key, keyType) => {
    if (keyType === 'number') {
      return this.state.displayedNum === '0' || this.state.previousKeyType === 'operator' || this.state.previousKeyType === 'calculate'
        ? key
        : this.state.displayedNum + key
    }

    if (keyType === 'decimal') {
      if (this.state.previousKeyType === 'operator' || this.state.previousKeyType === 'calculate') return '0.'
      if (!this.state.displayedNum.includes('.')) return this.state.displayedNum + '.'
      return this.state.displayedNum
    }

    if (keyType === 'operator') {
      return this.state.firstValue &&
        this.state.operator &&
        this.state.previousKeyType !== 'operator' &&
        this.state.previousKeyType !== 'calculate'
        ? this.calculate(this.state.firstValue, this.state.operator, this.state.displayedNum)
        : this.state.displayedNum
    }

    if (keyType === 'clear') return '0'

    if (keyType === 'calculate') {
      return this.state.firstValue
        ? this.state.previousKeyType === 'calculate'
          ? this.calculate(this.state.displayedNum, this.state.operator, this.state.modValue)
          : this.calculate(this.state.firstValue, this.state.operator, this.state.displayedNum)
        : this.state.displayedNum
    }
  }

  handleInput = key => {
    const keyType = this.getKeyType(key)
    const calculatedValue = this.createResultString(key, keyType);

  // callback function to ensure that the first 'setState' has been executed prior second call
  // 'modValue' - previous value needed for the new calculation
    this.setState({
      displayedNum: calculatedValue,
      modValue: this.state.firstValue && this.state.previousKeyType === 'calculate'
        ? this.state.modValue
        : this.state.displayedNum,
      previousKeyType: keyType,

    }, () => {
      if (keyType === 'operator') {
        this.setState({
          operator: key,
          firstValue: this.state.firstValue && this.state.operator && this.state.previousKeyType !== 'operator' && this.state.previousKeyType !== 'calculate'
            ? calculatedValue
            : this.state.displayedNum
        });
      }

      if (keyType === 'clear') {
        this.setState({
          firstValue: '',
          operator: '',
          modValue: '',
          previousKeyType: '',
          displayedNum: '0'
        });
      }
    });
  }

  render() {
    const ids = {
      clear: 'CE',
      divide: '/',
      multiply: '*',
      seven: '7',
      eight: '8',
      nine: '9',
      subtract: '-',
      four: '4',
      five: '5',
      six: '6',
      add: '+',
      one: '1',
      two: '2',
      three: '3',
      zero: '0',
      decimal: '.',
      equals: '='
    }
    return (
      <>
        <h1 className="logo">Calculator</h1>
        <div className="calculator" >
          <Display
            formula={(this.state.previousKeyType === 'calculate') ? '' : `${this.state.firstValue} ${this.state.operator}`}
            input={this.state.displayedNum} >
          </Display>
          <Keys ids={ids} handleInput={this.handleInput}></Keys>
        </div>
        <div className="author">by <a href="https://pythonsway.it" target="_blank" rel="noopener noreferrer">Python's way</a></div>
      </>
    );
  }
}

export default App;
