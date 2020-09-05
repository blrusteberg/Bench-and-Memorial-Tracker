import React from "react";
import axios from "axios";
import lodash from "lodash";

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
      showPopup: false,
      deletedAttributes: 0,
      addedAttributes: 0,
      isSaving: false,
      isUpdating: false
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
      deletedAttributes: 0,
      addedAttributes: 0
    });
  };

  deleteAttribute = (attributeIndex) => {
    const newSelected = lodash.cloneDeep(this.state.selected);
    newSelected.splice(attributeIndex, 1);
    this.setState({
      selected: newSelected,
      deletedAttributes: this.state.deletedAttributes + 1
    });
  };

  addAttribute = () => {
    let blankAttribute = {
      name: "",
      value: null,
      required: false,
      dataType: "string",
    };
    this.setState({
      selected: [...this.state.selected, blankAttribute],
      addedAttributes: this.state.addedAttributes + 1
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
      selected: newSelected
    });
  };

  saveAttributes = () => {

    this.setState({  
      showPopup: !this.state.showPopup  
    }); 

    if(this.checkIfNewType()){
      this.setState({  
        isUpdating: true 
      }); 
      //axios.put
      window.location.reload(false);
    } else {
      this.setState({  
        isSaving: true 
      }); 
      //axios.push
      window.location.reload(false);
    }

    // continue is pressed -> DISABLE SAVE BUTTON then show SAVING then refresh page then show toast

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

  togglePopup = () => {
    this.setState({  
      showPopup: !this.state.showPopup  
    });  

  }

  checkIfNewType = () => {
    return (parseInt(this.state.selectedTypeIndex) === this.state.initialTypes.length-1)
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
        {this.checkIfNewType() ? (
          <div>
            <label>Type name</label>
            <input
              className={styles.newType}
              type="text"
              placeholder="Enter a name..."
              value={this.state.newTypeName}
              onChange={this.handleNewTypeNameChange}
            />
          </div>) 
          : null
        }
        {this.state.selectedTypeIndex ? 
          <Attributes
            attributes={this.state.selected}
            addAttribute={this.addAttribute}
            updateAttribute={this.updateAttribute}
            saveAttributes={this.togglePopup}
            deleteAttribute={this.deleteAttribute}
            isNewType={this.checkIfNewType}
            isSaving={this.state.isSaving}
            isUpdating={this.state.isUpdating}
          />
          : null
        }
        {this.state.showPopup ?  
          <Popup  
              text='Click "Cancel" to hide popup' 
              saveAttributes={this.saveAttributes}
              closePopup={this.togglePopup}
              addedAttributes={this.state.addedAttributes}
              deletedAttributes={this.state.deletedAttributes}
          />  
          : null  
        }  
      </div>
    );
  }
}

export default memorialTypes;
