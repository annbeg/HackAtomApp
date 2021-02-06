// import React from 'react';

// import Select from 'react-select';
// // import { colourOptions } from '../data';
// import './Selecter.css'

// const options = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' }
//     // {value: 'moma'},{value: 'popa', label: 'popa'}
// ]
// // opt = ['choc', ...]


// const Selecter = ({ data }) => (
// 	// <div className="chart" style={style}>
//     <Select
//         // style={{width:'10%'}}
//         isMulti
//         name="colors"
//         options={data}
//         className="basic-multi-select"
//         classNamePrefix="select"
//     />
// 	// </div>
// );

// export default Selecter;

import React, { Component } from "react";
import ReactDOM from "react-dom";
import Select from "react-select";
import { FixedSizeList as List } from "react-window";

// import "./styles.css";

// const options = require('../list_of_dicts.json');
// for (let i = 0; i < 10000; i = i + 1) {
//   options.push({ value: i, label: `Option ${i}` });
// }

const height = 35;

class MenuList extends Component {
  render() {
    const { options, children, maxHeight, getValue } = this.props;
    const [value] = getValue();
    const initialOffset = options.indexOf(value) * height;

    return (
      <List
        height={maxHeight}
        itemCount={children.length}
        itemSize={height}
        initialScrollOffset={initialOffset}
      >
        {({ index, style }) => <div style={style}>{children[index]}</div>}
      </List>
    );
  }
}

const Selecter = ({ data, active }) => (
	// <div className="chart" style={style}>
    <Select
        // style={{width:'10%'}}
        defaultValue={active}
        isMulti
        // name="colors"
        options={data}
        components={{ MenuList }}
        // className="basic-multi-select"
        // classNamePrefix="select"
    />
	// </div>
);

// const App = () => <Select components={{ MenuList }} options={options} />;

// ReactDOM.render(<App />, document.getElementById("root"));
export default Selecter;
