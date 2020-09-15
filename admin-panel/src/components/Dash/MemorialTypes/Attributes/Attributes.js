import React from "react";
import axios from "axios";
import lodash, { update } from "lodash";
import styles from "./Attributes.module.css";
import addAttributeButton from "../../../../assets/addAttribute.png"
import deleteAttributeButton from "../../../../assets/deleteAttribute.png"

class attributes extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      selectedAttributes: [],
      allAttributes: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:1337/types/"+ this.props.selectedTypeId +"/attributes")
      .then((response) => {
        this.setState({
          selectedAttributes: [...response.data]
        });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
    .get("http://localhost:1337/attributes")
    .then((response) => {
      const sortedAttributes = (response.data).sort((a, b) => (a.Name > b.Name) ? 1 : -1)
      this.setState({
        allAttributes: [...sortedAttributes]
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  onChangeRequired = (event, n) => {
    console.log(n, event.target.value);
    const selected = lodash.cloneDeep(this.state.selectedAttributes);
    selected[n].Required = !(event.target.value === "true");
    this.setState({
      selectedAttributes: selected
    });
  };

  render(){
    return (
      <div>
        <div>
          <span>Label</span>
          <span>Data Type</span>
          <span>Required</span>
        </div>
        <div>
          {this.state.selectedAttributes.map((item, n) => 
            <div>
              <input type="text" key={item.Id} value={item.Name} disabled="disabled"/>
              <input type="text" value={item.ValueType} disabled="disabled"/>
              <input
                      type="checkbox"
                      checked={item.Required}
                      value={item.Required}
                      onChange={event => this.onChangeRequired(event, n)}
              />
              <br />
            </div>
          )}
        </div>
        {/* <div>
          {props.attributes.map((item, n) => (item.name === 'longitude' || item.name === 'latitude') ?
              <div>
                  <input readOnly type="text" disabled="disabled" key={item._id} value={item.name}/>
                  <input readOnly type="text" disabled="disabled" value="Number"/>
                  <input type="checkbox" disabled="disabled" checked="checked"/>
              </div>
              :
              <div>
                  <img className={styles.deleteAttributeButton} src={deleteAttributeButton} onClick={() => props.deleteAttribute(n)}></img>
                  <input type="text" key={item._id} value={item.name} onChange={event => props.updateAttribute(event, n)}/>
                  <select value={item.dataType} onChange={event => props.updateAttribute(event, n)}>
                    <option value="date">Date</option>
                    <option value="number">Number</option>
                    <option value="boolean">Yes/No</option>
                    <option value="string">Words</option>
                  </select>
                  <input
                      type="checkbox"
                      checked={item.required}
                      value={item.required}
                      onChange={event => props.updateAttribute(event, n)}
                  />
              </div>
          )}
        </div>
        <img className={styles.addAttributeButton} src={addAttributeButton} onClick={() => props.addAttribute()}></img>
        <label>Add attribute</label>
        <br />
        <button onClick={() => props.saveAttributes()}>
          {props.isNewType() ? "Update" : "Save"}
        </button> 
        <h3>{props.isSaving ? "Saving..." : null}</h3>
        <h3>{props.isUpdating ? "Updating..." : null}</h3> */}
      </div>
    );
  }
};

export default attributes;