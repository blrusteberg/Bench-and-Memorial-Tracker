import React from "react";
import InputForm from "../InputForm/InputForm"
import memtypes from './data/memorial-types.json'

class Dropdown extends React.Component {
    constructor(props) {
      super(props);
      this.inputformElement = React.createRef();
      this.state = {
        types: memtypes.memorialTypes[0]
    };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.inputformElement.current.handleSelected(this.state.types[event.target.value]);
    }
  
    handleSubmit(event) {
      //save new types
    }
  
    render() {
      return (
        <form onChange={this.handleChange}>
          <label>
            Pick a type:
            <select value={this.state.types[0]}>
              {Object.keys(this.state.types).map(list => (
                  <option key={list} value={list}>
                      {list}
                  </option>
              ))}
            </select>
          </label>
          <div><InputForm ref={this.inputformElement} selected={this.state.types.building}/></div>
        </form>
      );
    }
  }
  
export default Dropdown;