import React from "react";
import InputForm from "../InputForm/InputForm"
import memtypes from './data/memorial-types.json'

class Dropdown extends React.Component {
    constructor(props) {
      super(props);
      this.inputformElement = React.createRef();
      this.state = {
        types: memtypes.memorialTypes,
        value: 0,
        newType: ''
    };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
      this.addType = this.addType.bind(this);
      this.updateAttributes = this.updateAttributes.bind(this);
    }
  
    handleChange(event) {
      console.log(this.state.types);
      this.setState({
        value : event.target.value
      });
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
      let addType = { 'name': this.state.newType, 'attributes': [] };

      this.setState({
        types: this.state.types.concat(addType)
      });

      this.setState({
        newType : ''
      });
      document.getElementById("new-type").value = "";
    }

    updateAttributes(newState) {
      this.setState(prevState => {
        let types = Object.assign({}, prevState.types); 
        types[this.state.value].attributes = newState;                     
        return types;                          
      })
    }
  
    render() {
      const firstType = Object.values(this.state.types)[0];
      return (
        <div>
          <input id="new-type" type="text" defaultValue='' name={this.state.newType} onChange={this.handleInputChange}/> 
          <button onClick={this.addType}>Add Type</button>
          <form onChange={this.handleChange}>
            <label>
              Pick a type:
              <select>
                {(Object.values(this.state.types)).map((list, n) => (
                    <option key={list.name} value={n}>
                        {list.name}
                    </option>
                ))}
              </select>
            </label>
          </form> 
          <InputForm ref={this.inputformElement} selected={firstType} updateAttributes={this.updateAttributes}/>
        </div>
      );
    }
  }
  
export default Dropdown;