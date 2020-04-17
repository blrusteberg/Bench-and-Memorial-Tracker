import React from "react";
import memorials from './memorial-types.json'
import styles from "./MemorialTypes.module.css";
import Dropdown from "./Dropdown/Dropdown";
import Attributes from "./Attributes/Attributes";

class memorialTypes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
          types: memorials.memorialTypes,
          selected: memorials.memorialTypes[0].attributes,
          value: 0,
          counter:  0
    };
    this.updateAttribute = this.updateAttribute.bind(this)
  }

  dropdownChange = (event) => {
    const selected = this.state.types[event.target.value].attributes;
    this.setState({ 
      selected: selected,
      value: event.target.value
    });
  };

  deleteAttribute = (n) => {
    // const newSelected = this.state.selected.filter((item,n) => {
    //   console.log(item, items);
    //   return item.name !== name;
    // });

    const newSelected = this.state.selected;
    newSelected.splice(n, 1);

    const types = [...this.state.types];
    types[this.state.value].attributes = newSelected;
    
    this.setState({
      selected: newSelected,
      types: types
    });

  };

  addAttribute() {
    this.setState({ 
      counter: this.state.counter+1
    });
    let blankAttribute = {'name' : ''+this.state.counter, "value": null, "required": false};
    let newSelected = [...this.state.selected];
    newSelected = newSelected.concat(blankAttribute);

    const types = [...this.state.types];
    types[this.state.value].attributes = newSelected;

    this.setState({
      selected: newSelected,
      types: types
    });
  }

  updateAttribute(value, n) {
    let newSelected = [...this.state.selected];
    newSelected[n].name = value;

    const types = [...this.state.types];
    types[this.state.value].attributes = newSelected;

    this.setState({
      selected : newSelected,
      types: types                         
    });
  }

  render() {
    return (
    <div className="memorialTypes">
      <Dropdown  
        types={this.state.types}
        dropdownChange={this.dropdownChange}
      />
      <button onClick={() => this.addAttribute()}>Add Attribute</button>
      <Attributes 
        attributes={this.state.selected}
        updateAttribute={this.updateAttribute}
        deleteAttribute={this.deleteAttribute}
      />
    </div>
    );
  }
}

export default memorialTypes;
