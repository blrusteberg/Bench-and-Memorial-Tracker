import React from "react";
import InputForm from "../InputForm/InputForm"
import memtypes from './data/memorial-types.json'

class Dropdown extends React.Component {
    constructor(props) {
      super(props);
      this.inputformElement = React.createRef();
      this.state = {
        types: memtypes.memorialTypes[0],
        newType: ''
    };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
      this.addType = this.addType.bind(this);
    }
  
    handleChange(event) {
      this.inputformElement.current.handleSelected(this.state.types[event.target.value]);
    }
  
    handleSubmit(event) {
      event.preventDefault();
    }

    handleInputChange(event) {
      this.setState({
        newType : event.target.value
      });
    }

    addType(event) {
      event.preventDefault();

      this.setState({
        types: Object.assign(this.state.types, {[this.state.newType]: {'attributes': []}})
      });

      this.setState({
        newType : ''
      });
      document.getElementById("new-type").value = "";
    }
  
    render() {
      const firstType = Object.keys(this.state.types)[0]
      return (
        <div>
          <input id="new-type" type="text" defaultValue='' name={this.state.newType} onChange={this.handleInputChange}/> 
          <button onClick={this.addType}>Add Type</button>
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
          </form>
          <InputForm ref={this.inputformElement} selected={this.state.types[firstType]}/>
        </div>
      );
    }
  }
  
export default Dropdown;