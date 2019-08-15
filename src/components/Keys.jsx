import React from 'react';
import './Keys.css';

class Keys extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: null
    }
    this.calcRef = React.createRef();
  }
  // focus 'keys' for event listerers
  componentDidMount = () => {
    this.calcRef.current.focus();
  }

  handleKeyDown = event => {
    event.preventDefault();

    if (event.key === 'Enter') {
      this.setState({
        activeKey: '='
      });
      this.props.handleInput('=');
    }
    if (event.key === 'Escape' || event.key === 'Esc') {
      this.setState({
        activeKey: 'CE'
      });
      this.props.handleInput('CE');
    }
    if (Object.values(this.props.ids).includes(event.key)) {
      this.setState({
        activeKey: event.key
      });
      this.props.handleInput(event.key);
    }
  };

  render() {
    return (
      <div id="keys" >
        {Object.keys(this.props.ids).map((key) => (
          <button
            ref={(key === 'clear') ? this.calcRef : ''}
            key={key}
            id={key}
            className={this.state.activeKey === this.props.ids[key] ? 'buttonActive' : undefined}
            onClick={() => this.props.handleInput(this.props.ids[key])}
            onKeyDown={this.handleKeyDown}
            onKeyUp={() => this.setState({activeKey: null})}>
            {this.props.ids[key]}
          </button>
        ))
        }
      </div>
    );
  }
}

export default Keys;
