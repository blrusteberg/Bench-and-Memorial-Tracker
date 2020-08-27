import React from "react";
import styles from "./MemorialTypes.module.css";
import Dropdown from "./Dropdown/Dropdown";
import Attributes from "./Attributes/Attributes";
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
    let blankAttribute = { name: "", value: null, required: false, dataType: "number" };
    let newSelected = [...this.state.selected];
    newSelected = newSelected.concat(blankAttribute);

    const types = [...this.state.types];
    types[this.state.value].attributes = newSelected;

    this.setState({
      selected: newSelected,
      types: types,
    });
  }

  updateAttribute(event, n) {
    let newSelected = [...this.state.selected];

    if(event.type === "text"){
      newSelected[n].name = event.value;
    }
    else if(event.type === "select-one"){
      newSelected[n].dataType = event.value;
    }
    else if(event.type === "checkbox"){
      newSelected[n].required = (event.value === "true");
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

    if(name.trim() === ""){
      return
    }

    let newType = { name: name, attributes: [] };
    const longitude = { name: "longitude", value: null, required: false, dataType: "number"  };
    const latitude = { name: "latitude", value: null, required: false, dataType: "number"  };

    newType.attributes = [longitude, latitude];
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
    let memorialObject = JSON.stringify(memorialTypes);

    // Updates ENTIRE memorialTypes with newly updated memorialObject
    // axios.put('http://localhost:1337/memorials/types', memorialObject)
    //   .then(res => console.log(res.data));
  }

  render() {
    return (
      <div className={styles.mainContainer}>
        <input
          className={styles.newType}
          type="text"
          id="new-type"
          defaultValue=""
        />
        <button variant="primary" onClick={() => this.addType()}>
          Add Type
        </button>
        <br />
        <br />
        <Dropdown
          types={this.state.types}
          dropdownChange={this.dropdownChange}
        />
        <button variant="primary" onClick={() => this.saveAttributes()}>
          Save
        </button>
        <br />
        <button variant="primary" onClick={() => this.addAttribute()}>
          Add Attribute
        </button>
        <br />
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
