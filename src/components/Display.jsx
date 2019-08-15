import React from 'react';
import './Display.css';

const Display = (props) => (
    <div id="display">
        {/* prevent overflow */}
        <div id="formula">{props.formula.substring(props.formula.length - 30)}</div>
        <div id="input">{props.input.substring(0, 14)}</div>
    </div>
)

export default Display;