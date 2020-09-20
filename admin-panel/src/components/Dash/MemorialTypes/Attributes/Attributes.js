import React from "react";
import axios from "axios";
import lodash, { filter, update, difference } from "lodash";
import styles from "./Attributes.module.css";
import deleteAttributeButton from "../../../../assets/deleteAttribute.png"

class attributes extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      selectedAttributes: [],
      allAttributes: [],
      showAttributes: false,
      searchAttribute: "",
      showSaveButton: false,
      isSaving: false
    };
  }

  componentDidMount() {
      axios
        .get("http://localhost:1337/attributes")
        .then((res) => {

          if(this.props.selectedTypeId){
            axios
              .get("http://localhost:1337/types/"+ this.props.selectedTypeId +"/attributes")
              .then((response) => {
                let selectedAttributes = []
                response.data.forEach((attribute, index) => {
                  attribute.Name.toLowerCase() == "longitude" ||
                  attribute.Name.toLowerCase() == "latitude"
                    ? selectedAttributes.unshift(response.data[index])
                    : selectedAttributes.push(response.data[index]);
                });
                this.setState({
                  selectedAttributes: selectedAttributes
                }); 
            
                let filteredAttributes  = res.data.filter(function(allAttributes){
                  return response.data.filter(function(selectedAttributes){
                      return selectedAttributes.Id == allAttributes.Id;
                  }).length == 0
                });
                const sortedAttributes = filteredAttributes.sort((a, b) => (a.Name.toLowerCase() > b.Name.toLowerCase()) ? 1 : -1)
                this.setState({
                  allAttributes: [...sortedAttributes]
                });
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            const longitudeAttribute = res.data.find(item => item.Name.toLowerCase() == "longitude");
            const latitudeAttribute = res.data.find(item => item.Name.toLowerCase() == "latitude");
            const selectedAttributes = [longitudeAttribute, latitudeAttribute];

            let filteredAttributes  = res.data.filter(function(allAttributes){
              return selectedAttributes.filter(function(selectedAttributes){
                  return selectedAttributes.Id == allAttributes.Id;
              }).length == 0
            });

            const sortedAttributes = filteredAttributes.sort((a, b) => (a.Name.toLowerCase() > b.Name.toLowerCase()) ? 1 : -1)
            this.setState({
              selectedAttributes, selectedAttributes,
              allAttributes: [...sortedAttributes]
            });
          }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeRequired = (event, n) => {
    const selected = lodash.cloneDeep(this.state.selectedAttributes);
    selected[n].Required = !(event.target.value === "true");
    this.setState({
      selectedAttributes: selected,
      showSaveButton: true
    });
  };

  setAttributeDropdownShown = (shown) => {
    this.setState({
      showAttributes: shown
    })
  }

  updateSearch = (event) => {
    let searchText = event.target.value;
    this.setState({
      searchAttribute: searchText
    })
  }

  addAttribute = (attributeId) => {
    let allAttributes = [...this.state.allAttributes];
    let selectedAttributes = [...this.state.selectedAttributes]

    let filteredAttribute = allAttributes.find(item => item.Id === attributeId);
    filteredAttribute.Required = false;
    selectedAttributes.push(filteredAttribute)

    allAttributes = allAttributes.filter(function (item) {
      return item.Id != attributeId;
    });

    this.setState({
      allAttributes: allAttributes,
      selectedAttributes: selectedAttributes,
      showSaveButton: true
    })

  }

  deleteAttribute = (attributeId) => {
    let allAttributes = [...this.state.allAttributes];
    let selectedAttributes = [...this.state.selectedAttributes]

    let filteredAttribute = selectedAttributes.find(item => item.Id === attributeId);
    allAttributes.push(filteredAttribute)

    selectedAttributes = selectedAttributes.filter(function (item) {
      return item.Id != attributeId;
    });

    const sortedAttributes = allAttributes.sort((a, b) => (a.Name.toLowerCase() > b.Name.toLowerCase()) ? 1 : -1)

    this.setState({
      allAttributes: sortedAttributes,
      selectedAttributes: selectedAttributes,
      showSaveButton: true
    })

  }

  saveAttributes = () => {

    this.setState({
      isSaving: true
    })

    if(this.props.selectedTypeId){
      if(this.props.typeName != this.props.oldTypeName){
        const newTypeName = { Name: this.props.typeName }
        axios.put('http://localhost:1337/types/' + this.props.selectedTypeId, newTypeName)
        .then((res) => { console.log(res.data) })
        .catch((error) => {
          console.log(error);
        });
      }
      //lock button and change to updating
      const newMemorialTypesObject = { Attributes: this.state.selectedAttributes };
      axios.put('http://localhost:1337/types/'+ this.props.selectedTypeId + "/attributes", newMemorialTypesObject)
        .then((res) => { console.log(res.data) })
        .catch((error) => {
          console.log(error);
        });
      window.location.reload(true);
    } else {
       //lock button and change to saving
      const newMemorialTypesObject = { Type: { Name: this.props.typeName }, Attributes: this.state.selectedAttributes };
      axios.post('http://localhost:1337/types/attributes', newMemorialTypesObject)
        .then((res) => { console.log(res.data) })
        .catch((error) => {
          console.log(error);
        });
      window.location.reload(true);
    }
  }

  deleteType = () => {

    this.setState({
      isSaving: true
    })

    axios.delete('http://localhost:1337/types/'+ this.props.selectedTypeId)
      .then((res) => { console.log(res.data) })
      .catch((error) => {
        console.log(error);
      });
    window.location.reload(true);
  }

  // enableSaveButton = () => {
  //   console.log('hi');
  //   this.setState({ showSaveButton: true })
  // }

  render(){

    const showSaveButton = this.state.showSaveButton || this.props.isTypeNameChanged;
    const showAttributes = this.state.showAttributes;
    const isExistingType = this.props.selectedTypeId;
    const isSaving = this.state.isSaving;

    let selectedAttributes = this.state.selectedAttributes;
    let filteredAttributes = this.state.allAttributes.filter(attribute => {
      return attribute.Name.toLowerCase().indexOf(this.state.searchAttribute.toLowerCase()) !== -1;
    })

    // this.props.isTypeNameChanged && this.enableSaveButton();
    // console.log(this.props.isTypeNameChanged);

    return (
      <div>
        <br />
        <div class={styles.dropdown} onMouseEnter={()=>this.setAttributeDropdownShown(true)} onMouseLeave={()=>this.setAttributeDropdownShown(false)}>
          <input type="text" placeholder="Add an Attribute.." value={this.state.searchAttribute} onChange={(event)=>this.updateSearch(event)} autoComplete="off" />
          {showAttributes && (
            <ul class={styles.dropdownContent}>
              {Object.values(filteredAttributes).map(list => (
                <div key={list.Id} value={list.Name} onClick={() =>this.addAttribute(list.Id)}>
                  {list.Name}
                </div>
              ))}
            </ul>
          )}
        </div>
        <br />
        <br />
        <div>
          <span>Label</span>
          <span>Data Type</span>
          <span>Required</span>
        </div>
        <div>
          {selectedAttributes.map((item, n) => 
            <div>
            {item.Name.toLowerCase() == "longitude" || item.Name.toLowerCase() == "latitude" ? 
              <div>
                <input type="text" key={item.Id} value={item.Name} disabled="disabled"/>
                <input type="text" value={item.ValueType} disabled="disabled"/> 
                <input type="checkbox" checked="true" disabled="disabled"/>
                <br />
              </div>
              :
              <div>
                <img className={styles.deleteAttributeButton} src={deleteAttributeButton} onClick={() =>this.deleteAttribute(item.Id)}></img>
                <input type="text" key={item.Id} value={item.Name} disabled="disabled"/>
                <input type="text" value={item.ValueType} disabled="disabled"/>
                <input
                        type="checkbox"
                        checked={item.Required}
                        value={item.Required}
                        onChange={(event) => this.onChangeRequired(event, n)}
                />
                <br />
              </div>
            }
            </div>
          )}
          {
            showSaveButton &&
            <button onClick={() => this.saveAttributes()} disabled={isSaving}>
              Save Type
            </button>
          }
          <br />
          {(isExistingType ? (
            <button onClick={() => this.deleteType()} disabled={isSaving}>Delete Type</button>)
            : null
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