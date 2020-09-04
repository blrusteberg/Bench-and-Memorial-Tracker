import React from "react";
import axios from "axios";
import lodash from "lodash";

import styles from "./MemorialTypes.module.css";
import Dropdown from "./Dropdown/Dropdown";
import Attributes from "./Attributes/Attributes";

class memorialTypes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialTypes: [],
      selected: [],
      selectedTypeIndex: 0,
      newTypeName: "",
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:1337/memorials/types")
      .then((response) => {
        const memorialTypes = response.data.memorialTypes;
        const addType = {
          name: " + New Type",
          attributes: [
            {
              name: "longitude",
              value: null,
              required: true,
              dataType: "number",
            },
            {
              name: "latitude",
              value: null,
              required: true,
              dataType: "number",
            },
          ],
        };
        memorialTypes.push(addType);
        this.setState({
          initialTypes: memorialTypes,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  dropdownChange = (event) => {
    const attributes = lodash.cloneDeep(
      this.state.initialTypes[event.target.value].attributes
    );
    this.setState({
      selected: attributes,
      selectedTypeIndex: event.target.value,
    });
  };

  deleteAttribute = (attributeIndex) => {
    const newSelected = lodash.cloneDeep(this.state.selected);
    newSelected.splice(attributeIndex, 1);
    this.setState({
      selected: newSelected,
    });
  };

  addAttribute = () => {
    let blankAttribute = {
      name: "",
      value: null,
      required: false,
      dataType: "number",
    };
    this.setState({
      selected: [this.state.selected, blankAttribute],
    });
  };

  updateAttribute = (event, n) => {
    const newSelected = lodash.cloneDeep(this.state.selected);
    if (event.target.type === "text") {
      newSelected[n].name = event.target.value;
    }
    if (event.target.type === "select-one") {
      newSelected[n].dataType = event.target.value;
    } else if (event.target.type === "checkbox") {
      newSelected[n].required = !(event.target.value === "true");
    }
    this.setState({
      selected: newSelected,
    });
  };

  saveAttributes = () => {
    let memorialTypes = this.state.Initialtypes;
    memorialTypes = { memorialTypes };
    let memorialObject = JSON.stringify(memorialTypes);

    // Updates ENTIRE memorialTypes with newly updated memorialObject
    // axios.put('http://localhost:1337/memorials/types', memorialObject)
    //   .then(res => console.log(res.data));
  };

  handleNewTypeNameChange = (event) => {
    this.setState({ newTypeName: event.target.value });
  };

  render() {
    return (
      <div className={styles.memorialTypes}>
        <div className={styles.title}>Memorial Types</div>
        <Dropdown
          types={this.state.initialTypes}
          selectedTypeIndex={this.state.selectedTypeIndex}
          dropdownChange={this.dropdownChange}
        />
        {this.state.selectedTypeIndex ? (
          <div>
            <label>Type name</label>
            <input
              className={styles.newType}
              type="text"
              placeholder="Enter a name..."
              value={this.state.newTypeName}
              onChange={this.handleNewTypeNameChange}
            />
            <Attributes
              attributes={this.state.selected}
              addAttribute={this.addAttribute}
              updateAttribute={this.updateAttribute}
              saveAttributes={this.saveAttributes}
              deleteAttribute={this.deleteAttribute}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default memorialTypes;
