import React from "react";
import memorials from "./memorial-types.json";
import styles from "./MemorialTypes.module.css";
import Dropdown from "./Dropdown/Dropdown";
import Attributes from "./Attributes/Attributes";
import { Button, FormControl } from "react-bootstrap";
import axios from 'axios';

class memorialTypes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      types: [],
      selected: [],
      value: 0,
      newType: "",
    };

    this.updateAttribute = this.updateAttribute.bind(this);

  }

  componentDidMount() {
    axios.get('http://localhost:1337/memorials/types')
      .then(response => {
        this.setState({ 
          types: response.data.memorialTypes, 
          selected: response.data.memorialTypes[0].attributes,
        })
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
    }

  dropdownChange = (event) => {
    const selected = this.state.types[event.target.value].attributes;
    this.setState({
      selected: selected,
      value: event.target.value,
    });
  };

  deleteAttribute = (n) => {
    const newSelected = [...this.state.selected];
    newSelected.splice(n, 1);

    const types = [...this.state.types];
    types[this.state.value].attributes = newSelected;

    this.setState({
      selected: newSelected,
      types: types,
    });
  };

  addAttribute() {
    let blankAttribute = { name: "", value: null, required: false };
    let newSelected = [...this.state.selected];
    newSelected = newSelected.concat(blankAttribute);

    const types = [...this.state.types];
    types[this.state.value].attributes = newSelected;

    this.setState({
      selected: newSelected,
      types: types,
    });
  }

  updateAttribute(value, n, type) {
    let newSelected = [...this.state.selected];

    if(type === "NAME"){
      newSelected[n].name = value;
    }
    else if(type === "DATATYPE"){
      newSelected[n].dataType = value;
    }
    else{
      newSelected[n].required = (value === "true");
    }

    const types = [...this.state.types];
    types[this.state.value].attributes = newSelected;

    this.setState({
      selected: newSelected,
      types: types,
    });
  }

  addType() {
    const name = document.getElementById("new-type").value;

    const newType = { name: name, attributes: [] };

    let types = this.state.types;
    types = types.concat(newType);

    this.setState({
      types: types,
    });

    document.getElementById("new-type").value = "";
  }

  saveAttributes() {
    let memorialTypes = this.state.types;
    memorialTypes = { memorialTypes };
    let memString = JSON.stringify(memorialTypes);
  }

  render() {
    return (
      <div className={styles.mainContainer}>
        <FormControl
          className={styles.newType}
          type="text"
          id="new-type"
          defaultValue=""
        />
        <br />
        <Button variant="primary" onClick={() => this.addType()}>
          Add Type
        </Button>
        <br />
        <br />
        <Dropdown
          types={this.state.types}
          dropdownChange={this.dropdownChange}
        />
        <br />
        <Button variant="primary" onClick={() => this.addAttribute()}>
          Add Attribute
        </Button>
        <Button variant="primary" onClick={() => this.saveAttributes()}>
          Save
        </Button>
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
