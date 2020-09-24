import React from "react";
import axios from "axios";
import lodash, { filter, update, difference } from "lodash";
import styles from "./Attributes.module.css";
import deleteAttributeButton from "../../../../assets/deleteAttribute.png";
import Popup from "./Popup/Popup";
import "semantic-ui-css/semantic.min.css";
import { Dropdown } from "semantic-ui-react";

class attributes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      oldAttributes: [],
      selectedAttributes: [],
      allAttributes: [],
      showSaveButton: false,
      isSaving: false,
      showPopup: false,
      deletedAttributeCount: 0,
      deletedAttributes: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:1337/attributes")
      .then((res) => {
        if (this.props.selectedTypeId) {
          axios
            .get(
              "http://localhost:1337/types/" +
                this.props.selectedTypeId +
                "/attributes"
            )
            .then((response) => {
              let selectedAttributes = [];
              response.data.forEach((attribute, index) => {
                attribute.Name.toLowerCase() == "longitude" ||
                attribute.Name.toLowerCase() == "latitude"
                  ? selectedAttributes.unshift(response.data[index])
                  : selectedAttributes.push(response.data[index]);
              });
              this.setState({
                oldAttributes: response.data,
                selectedAttributes: selectedAttributes,
              });

              let filteredAttributes = res.data.filter(function (
                allAttributes
              ) {
                return (
                  response.data.filter(function (selectedAttributes) {
                    return selectedAttributes.Id == allAttributes.Id;
                  }).length == 0
                );
              });
              const sortedAttributes = filteredAttributes.sort((a, b) =>
                a.Name.toLowerCase() > b.Name.toLowerCase() ? 1 : -1
              );
              this.setState({
                allAttributes: [...sortedAttributes],
              });
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          const longitudeAttribute = res.data.find(
            (item) => item.Name.toLowerCase() == "longitude"
          );
          const latitudeAttribute = res.data.find(
            (item) => item.Name.toLowerCase() == "latitude"
          );
          const selectedAttributes = [longitudeAttribute, latitudeAttribute];

          let filteredAttributes = res.data.filter(function (allAttributes) {
            return (
              selectedAttributes.filter(function (selectedAttributes) {
                return selectedAttributes.Id == allAttributes.Id;
              }).length == 0
            );
          });

          const sortedAttributes = filteredAttributes.sort((a, b) =>
            a.Name.toLowerCase() > b.Name.toLowerCase() ? 1 : -1
          );
          this.setState({
            selectedAttributes,
            selectedAttributes,
            allAttributes: [...sortedAttributes],
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
      showSaveButton: true,
    });
  };

  addAttribute = (attributeId) => {
    let allAttributes = [...this.state.allAttributes];
    let selectedAttributes = [...this.state.selectedAttributes];

    let filteredAttribute = allAttributes.find(
      (item) => item.Id === attributeId
    );
    filteredAttribute.Required = false;
    selectedAttributes.push(filteredAttribute);

    allAttributes = allAttributes.filter(function (item) {
      return item.Id != attributeId;
    });

    this.setState({
      allAttributes: allAttributes,
      selectedAttributes: selectedAttributes,
      showSaveButton: true,
    });
  };

  deleteAttribute = (attributeId) => {
    let allAttributes = [...this.state.allAttributes];
    let selectedAttributes = [...this.state.selectedAttributes];

    let filteredAttribute = selectedAttributes.find(
      (item) => item.Id === attributeId
    );
    allAttributes.push(filteredAttribute);

    selectedAttributes = selectedAttributes.filter(function (item) {
      return item.Id != attributeId;
    });

    const sortedAttributes = allAttributes.sort((a, b) =>
      a.Name.toLowerCase() > b.Name.toLowerCase() ? 1 : -1
    );

    this.setState({
      allAttributes: sortedAttributes,
      selectedAttributes: selectedAttributes,
      showSaveButton: true,
    });
  };

  saveAttributes = () => {
    if (this.props.typeName.toLowerCase() === "") {
      alert("Type Name cannot be empty");
      return;
    }

    this.setState({
      isSaving: true,
    });

    if (this.props.selectedTypeId) {
      if (this.props.typeName != this.props.oldTypeName) {
        const newTypeName = { Name: this.props.typeName };
        axios
          .put(
            "http://localhost:1337/types/" + this.props.selectedTypeId,
            newTypeName
          )
          .then((res) => {
            console.log(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      const newMemorialTypesObject = {
        Attributes: this.state.selectedAttributes,
      };
      axios
        .put(
          "http://localhost:1337/types/" +
            this.props.selectedTypeId +
            "/attributes",
          newMemorialTypesObject
        )
        .then((res) => {
          console.log(res.data);
          window.location.reload(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const newMemorialTypesObject = {
        Type: { Name: this.props.typeName },
        Attributes: this.state.selectedAttributes,
      };
      axios
        .post("http://localhost:1337/types/attributes", newMemorialTypesObject)
        .then((res) => {
          console.log(res.data);
          window.location.reload(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  deleteType = () => {
    this.setState({
      isSaving: true,
    });

    axios
      .delete("http://localhost:1337/types/" + this.props.selectedTypeId)
      .then((res) => {
        console.log(res.data);
        window.location.reload(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  togglePopup = () => {
    if (this.state.showPopup === false) {
      this.calculateDeletedAttributes();
    }

    this.setState({
      showPopup: !this.state.showPopup,
    });
  };

  calculateDeletedAttributes = () => {
    let oldAttributes = [...this.state.oldAttributes];
    let selectedAttributes = [...this.state.selectedAttributes];
    let remainingAttributeCount = 0;
    let deletedAttributes = []
    let attributeIds = [];

    for (let i = 0; i < selectedAttributes.length; i++) {
      attributeIds[i] = selectedAttributes[i].Id;
    }
    for (let i = 0; i < oldAttributes.length; i++) {
      if (attributeIds.includes(oldAttributes[i].Id)) {
        remainingAttributeCount++;
      }
      else {
        deletedAttributes.push(oldAttributes[i].Name);
      }
    }



    let deletedAttributeCount = oldAttributes.length - remainingAttributeCount;
    this.setState({
      deletedAttributeCount: deletedAttributeCount,
      deletedAttributes: deletedAttributes
    });
  };

  render() {
    const showSaveButton =
      this.state.showSaveButton || this.props.isTypeNameChanged;
    const isExistingType = this.props.selectedTypeId;
    const isSaving = this.state.isSaving;
    const showPopup = this.state.showPopup;

    let selectedAttributes = this.state.selectedAttributes;

    const attributeOptions = this.state.allAttributes.map((item) => ({
      key: item.Id,
      text: item.Name,
      value: item.Name,
      onClick: () => this.addAttribute(item.Id),
    }));

    return (
      <div className={styles.attributes}>
        <div className={styles.attributeDropdownWrapper}>
          <Dropdown
            placeholder="Add an Attribute.."
            search
            selection
            options={attributeOptions}
            selectOnBlur={false}
          />
        </div>
        <table>
          <tbody>
            <tr className={styles.tableHeader}>
              <td></td>
              <td>Label</td>
              <td>Data Type</td>
              <td>Required</td>
            </tr>
            {selectedAttributes.map((item, n) => (
              <tr>
                {item.Name.toLowerCase() == "longitude" ||
                item.Name.toLowerCase() == "latitude"
                  ? [
                      <td><img
                      className={styles.hiddenDeleteAttributeButton}
                      src={deleteAttributeButton}
                    /></td>,
                      <td>
                        <input
                          type="text"
                          key={item.Id}
                          value={item.Name}
                          disabled="disabled"
                        />
                      </td>,
                      <td>
                        <input
                          type="text"
                          value={item.ValueType}
                          disabled="disabled"
                        />{" "}
                      </td>,
                      <td className={styles.requiredCheckBox}>
                        <input
                          type="checkbox"
                          checked={true}
                          disabled="disabled"
                        />
                      </td>,
                    ]
                  : [
                      <td>
                        <div className={styles.deleteArributeWrapper}>
                          <img
                            className={styles.deleteAttributeButton}
                            src={deleteAttributeButton}
                            onClick={() => this.deleteAttribute(item.Id)}
                          />
                        </div>
                      </td>,
                      <td>
                        <input
                          type="text"
                          key={item.Id}
                          value={item.Name}
                          disabled="disabled"
                        />
                      </td>,
                      <td>
                        <input
                          type="text"
                          value={item.ValueType}
                          disabled="disabled"
                        />
                      </td>,
                      <td className={styles.requiredCheckBox}>
                        <input
                          type="checkbox"
                          checked={item.Required}
                          value={item.Required}
                          onChange={(event) => this.onChangeRequired(event, n)}
                        />
                      </td>,
                    ]}
              </tr>
            ))}
          </tbody>
        </table>
            <div className={styles.buttonsWrapper}>
              <div className={styles.saveButtonWrapper}>
                {showSaveButton && isExistingType && (
                  <button
                    className={styles.saveButton}
                    onClick={() => this.togglePopup()}
                    disabled={isSaving}
                  >
                    Save Type
                  </button>
                )}
              </div>
              <div className={styles.saveButtonWrapper}>
                {!isExistingType && (
                  <button
                    className={styles.saveButton}
                    onClick={() => this.saveAttributes()}
                    disabled={isSaving}
                  >
                    Save Type
                  </button>
                )}
              </div>
              <div className={styles.deleteButtonWrapper}>
                {isExistingType ? (
                  <button
                    className={styles.deleteButton}
                    onClick={() => this.deleteType()}
                    disabled={isSaving}
                  >
                    Delete Type
                  </button>
                ) : null}
              </div>
            </div>
            {showPopup && (
              <Popup
                text='Click "Cancel" to hide popup'
                saveAttributes={this.saveAttributes}
                deletedAttributeCount={this.state.deletedAttributeCount}
                deletedAttributes={this.state.deletedAttributes}
                oldTypeName={this.props.oldTypeName}
                newTypeName={this.props.typeName}
                closePopup={this.togglePopup}
              />
            )}
          
      </div>
    );
  }
}

export default attributes;
