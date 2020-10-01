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
      isTypeNameChanged: false
    };
  }

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/types`)
      .then((response) => {
        let memorialTypes = [];
        if(response.data.length > 0){
          memorialTypes = response.data
        }
        const addType = {
          Name: " + New Type"
        };
        memorialTypes.unshift(addType);
        this.setState({
          initialTypes: memorialTypes,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  dropdownChange = (event) => {
    const selectedType = lodash.cloneDeep(
      this.state.initialTypes[event.target.value]
    );
    this.setState({
      selected: selectedType,
      selectedTypeIndex: event.target.value,
      newTypeName: selectedType.Id ? selectedType.Name : "",
      isTypeNameChanged: false
    });
  };

  handleNewTypeNameChange = (event) => {
    this.setState({ 
      newTypeName: event.target.value,
      isTypeNameChanged: true 
    });
  };

  togglePopup = () => {
    this.setState({  
      showPopup: !this.state.showPopup  
    });  

  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.title}>Memorial Types Form</div>
        <div className={styles.dropDownWrapper}>
          <div>Memorial Types</div>
          <Dropdown
            types={this.state.initialTypes}
            selectedTypeIndex={this.state.selectedTypeIndex}
            dropdownChange={this.dropdownChange}
          />
        </div>
        {(this.state.selectedTypeIndex ? (
          <div>
            <div className={styles.memorialTypeNameWrapper}>
            <div className={styles.memorialTypeName}>Memorial Type Name</div>
              <input
                className={styles.memorialTypeNameInput}
                type="text"
                value={this.state.newTypeName}
                placeholder="Enter a name..."
                onChange={this.handleNewTypeNameChange}
                maxLength={50}
              />
            </div>
            <div className={styles.attributesWrapper}>
              <Attributes
                key={this.state.selected.Id}
                selectedTypeId={this.state.selected.Id}
                oldTypeName={this.state.selected.Name}
                typeName={this.state.newTypeName}
                isTypeNameChanged={this.state.isTypeNameChanged}
              />
            </div>
          </div>)
          : null
        )}
      </div>
    );
  }
}

export default memorialTypes;
