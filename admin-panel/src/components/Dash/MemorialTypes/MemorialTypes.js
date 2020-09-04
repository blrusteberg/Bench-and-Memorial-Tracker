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
      newTypeName: "",
      selectNewType: false
    };

    this.addAttribute = this.addAttribute.bind(this);
    this.updateAttribute = this.updateAttribute.bind(this);
    this.saveAttributes = this.saveAttributes.bind(this);
    this.deleteAttribute = this.deleteAttribute.bind(this);
    this.handleNewTypeNameChange = this.handleNewTypeNameChange.bind(this);

  }

  componentDidMount() {
    axios.get('http://localhost:1337/memorials/types')
      .then(response => {
        let memorialTypes = response.data.memorialTypes;
        let addType = {
                        name: "Add a type", 
                        attributes: [{ "name": "longitude", "value": null, "required": false, "dataType": "number"  },
                        { "name": "latitude", "value": null, "required": false, "dataType": "number"  }]
        };
        memorialTypes.push(addType);
        this.setState({ 
          types: memorialTypes
        })
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
    }

  dropdownChange = (event) => {
    if(event.target.value === "selectType"){
      this.setState({
        selectNewType: false,
        value: -1
      })
    }
    else {
      console.log(this.state.types[event.target.value].attributes); 
      let attributes = [...(this.state.types[event.target.value].attributes)];
      console.log(attributes);
      this.setState({
        selectNewType: true,
        selected: attributes,
        value: event.target.value,
      });
    }
  };

  deleteAttribute = (n) => {
    const newSelected = [...this.state.selected];
    newSelected.splice(n, 1);

    this.setState({
      selected: newSelected,
    });
  };

  addAttribute = () => {
    let blankAttribute = { name: "", value: null, required: false, dataType: "number" };
    let newSelected = [...this.state.selected];
    newSelected = newSelected.concat(blankAttribute);

    this.setState({
      selected: newSelected,
    });
  }

  updateAttribute = (event, n) => {
    let newSelected = [...this.state.selected];

    if(event.target.type === "text"){
      newSelected[n].name = event.target.value;
    }
    if(event.target.type === "select-one"){
      newSelected[n].dataType = event.target.value;
    }
    else if(event.target.type === "checkbox"){
      newSelected[n].required = !(event.target.value === "true");
    }
    console.log(this.state.selected);
    this.setState({
      selected: newSelected
    });
  }

  saveAttributes = () => {
    let memorialTypes = this.state.types;
    memorialTypes = { memorialTypes };
    let memorialObject = JSON.stringify(memorialTypes);

    // Updates ENTIRE memorialTypes with newly updated memorialObject
    // axios.put('http://localhost:1337/memorials/types', memorialObject)
    //   .then(res => console.log(res.data));
  }

  handleNewTypeNameChange = (event) => {
    this.setState({newTypeName: event.target.value});
  }

  render() {
    return (
      <div className={styles.mainContainer}>
        <br />
        <br />
        <Dropdown
          types={this.state.types}
          dropdownChange={this.dropdownChange}
        />
        {(this.state.value == this.state.types.length-1) ? 
          <div>
            <label>Type name</label>
            <input
              className={styles.newType}
              type="text"
              placeholder="Enter a name..."
              value={this.state.newTypeName}
              onChange={(this.handleNewTypeNameChange)}
            />
          </div>
          : null
        }
        <br />
        {this.state.selectNewType ? 
        <Attributes
          attributes={this.state.selected}
          addAttribute={this.addAttribute}
          updateAttribute={this.updateAttribute}
          saveAttributes={this.saveAttributes}
          deleteAttribute={this.deleteAttribute}
        /> 
        : null
        }
      </div>
    );
  }
}

export default memorialTypes;
