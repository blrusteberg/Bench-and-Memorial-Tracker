import React from "react";
import axios from "axios";
import lodash, { update } from "lodash";

import styles from "./MemorialTypes.module.css";
import Dropdown from "./Dropdown/Dropdown";
import Attributes from "./Attributes/Attributes";
import Popup from './Popup/Popup';

class memorialTypes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialTypes: [],
      selected: [],
      selectedTypeIndex: 0,
      newTypeName: "",
      deletedAttributes: 0,
      addedAttributes: 0,
      isTypeNameChanged: false
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:1337/types")
      .then((response) => {
        let memorialTypes = [];
        if(response.data.length > 0){
          memorialTypes = response.data
        }
        const addType = {
          Name: " + New Type"
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
    const selectedType = lodash.cloneDeep(
      this.state.initialTypes[event.target.value]
    );
    this.setState({
      selected: selectedType,
      selectedTypeIndex: event.target.value,
      deletedAttributes: 0,
      addedAttributes: 0,
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
      <div className={styles.memorialTypes}>
        <div className={styles.title}>Memorial Types</div>
        <Dropdown
          types={this.state.initialTypes}
          selectedTypeIndex={this.state.selectedTypeIndex}
          dropdownChange={this.dropdownChange}
        />
        {(this.state.selectedTypeIndex ? (
          <div>
            <label>Type name</label>
            <input
              className={styles.newType}
              type="text"
              value={this.state.newTypeName}
              placeholder="Enter a name..."
              onChange={this.handleNewTypeNameChange}
            />
            <Attributes
              key={this.state.selected.Id}
              selectedTypeId={this.state.selected.Id}
              oldTypeName={this.state.selected.Name}
              typeName={this.state.newTypeName}
              isTypeNameChanged={this.state.isTypeNameChanged}
            />
          </div>)
          : null
        )}
        {/* {this.state.showPopup ?  
          <Popup  
              text='Click "Cancel" to hide popup' 
              saveAttributes={this.saveAttributes}
              closePopup={this.togglePopup}
              addedAttributes={this.state.addedAttributes}
              deletedAttributes={this.state.deletedAttributes}
          />  
          : null  
        }   */}
      </div>
    );
  }
}

export default memorialTypes;
