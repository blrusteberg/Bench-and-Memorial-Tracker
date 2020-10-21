import React from "react";
import axios from "axios";
import lodash from "lodash";
import styles from "./Attributes.module.css";
import deleteAttributeButton from "../../../assets/deleteAttribute.png";
import "antd/dist/antd.css";
import Popup from "./Popup/Popup";
import { Input, Button, Modal, Select } from "antd";

const DEFAULT_URL = "https://memorialtrackerphotos.blob.core.windows.net/memorialicons/memorials.png"

const urlArray = [
  "https://memorialtrackerphotos.blob.core.windows.net/memorialicons/artist.png",
  "https://memorialtrackerphotos.blob.core.windows.net/memorialicons/bank.png",
  "https://memorialtrackerphotos.blob.core.windows.net/memorialicons/bench.png",
  "https://memorialtrackerphotos.blob.core.windows.net/memorialicons/building.png",
  "https://memorialtrackerphotos.blob.core.windows.net/memorialicons/bus-stop.png",
  "https://memorialtrackerphotos.blob.core.windows.net/memorialicons/hamburger.png",
  "https://memorialtrackerphotos.blob.core.windows.net/memorialicons/headstone.png",
  "https://memorialtrackerphotos.blob.core.windows.net/memorialicons/history-book.png",
  "https://memorialtrackerphotos.blob.core.windows.net/memorialicons/hospital.png",
  "https://memorialtrackerphotos.blob.core.windows.net/memorialicons/mausoleum.png",
  "https://memorialtrackerphotos.blob.core.windows.net/memorialicons/memorial.png",
  "https://memorialtrackerphotos.blob.core.windows.net/memorialicons/memorials.png",
  "https://memorialtrackerphotos.blob.core.windows.net/memorialicons/statue-of-liberty.png",
  "https://memorialtrackerphotos.blob.core.windows.net/memorialicons/statue.png",
  "https://memorialtrackerphotos.blob.core.windows.net/memorialicons/tree.png",
  "https://memorialtrackerphotos.blob.core.windows.net/memorialicons/waving-flag.png",
];

class Attributes extends React.Component {
  state = {
    oldAttributes: [],
    selectedAttributes: [],
    allAttributes: [],
    showSaveButton: false,
    isSaving: false,
    showPopup: false,
    deletedAttributeCount: 0,
    deletedAttributes: [],
    showDeleteModal: false,
    invalidTextInput: false,
    deleteTypeInput: "",
    visible: false,
    imageArray: [],
    currentUrl: "",
  };

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/attributes`)
      .then((res) => {
        if (this.props.selectedTypeId) {
          axios
            .get(
              `${process.env.REACT_APP_API_BASE_URL}/types/${this.props.selectedTypeId}/attributes`
            )
            .then((response) => {
              let selectedAttributes = [];
              response.data.forEach((attribute, index) => {
                attribute.Name.toLowerCase() === "longitude" ||
                attribute.Name.toLowerCase() === "latitude"
                  ? selectedAttributes.unshift(response.data[index])
                  : selectedAttributes.push(response.data[index]);
              });
              this.setState({
                oldAttributes: response.data,
                selectedAttributes: selectedAttributes,
              });

              let filteredAttributes = res.data.filter(
                (allAttributes) =>
                  response.data.filter(
                    (selectedAttributes) =>
                      selectedAttributes.Id === allAttributes.Id
                  ).length === 0
              );
              const sortedAttributes = filteredAttributes.sort((a, b) =>
                a.Name.toLowerCase() > b.Name.toLowerCase() ? 1 : -1
              );
              let currentUrl = this.props.oldUrl ? this.props.oldUrl : DEFAULT_URL;
              this.setState({
                allAttributes: [...sortedAttributes],
                currentUrl: currentUrl
              });
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          const longitudeAttribute = res.data.find(
            (item) => item.Name.toLowerCase() === "longitude"
          );
          const latitudeAttribute = res.data.find(
            (item) => item.Name.toLowerCase() === "latitude"
          );
          const selectedAttributes = [longitudeAttribute, latitudeAttribute];

          let filteredAttributes = res.data.filter(function (allAttributes) {
            return (
              selectedAttributes.filter(function (selectedAttributes) {
                return selectedAttributes.Id === allAttributes.Id;
              }).length === 0
            );
          });

          const sortedAttributes = filteredAttributes.sort((a, b) =>
            a.Name.toLowerCase() > b.Name.toLowerCase() ? 1 : -1
          );

          
          this.setState({
            selectedAttributes,
            allAttributes: [...sortedAttributes],
            currentUrl: DEFAULT_URL,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

      let imageArray = urlArray.map((item, index) => {
        return (
          <img 
            className={styles.icons}
            key={index}
            src={item}
            alt=""
            onClick={() => this.handleIconOnClick(item)}
          />
        )
      })
      

      this.setState({
        imageArray: imageArray
      })
  }

  onChangeRequired = (event, n) => {
    const selected = lodash.cloneDeep(this.state.selectedAttributes);
    selected[n].Required = !(event.target.value === "true");
    this.setState({
      selectedAttributes: selected,
      showSaveButton: true,
    });
  };

  onAttributeClick = (attributeId) => this.addAttribute(attributeId);

  addAttribute = (attributeId) => {
    let allAttributes = [...this.state.allAttributes];
    let selectedAttributes = [...this.state.selectedAttributes];

    let filteredAttribute = allAttributes.find(
      (item) => item.Id === attributeId
    );
    filteredAttribute.Required = false;
    selectedAttributes.push(filteredAttribute);

    allAttributes = allAttributes.filter((item) => item.Id !== attributeId);

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
      return item.Id !== attributeId;
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
      if (this.props.typeName !== this.props.oldTypeName || this.props.oldUrl != this.state.currentUrl) {
        const newTypeName = { Name: this.props.typeName, Icon: this.state.currentUrl };
        axios
          .put(
            process.env.REACT_APP_API_BASE_URL +
              "/types/" +
              this.props.selectedTypeId,
            newTypeName
          )
          .then((res) => {})
          .catch((error) => {
            console.log(error);
          });
      }
      const newMemorialTypesObject = {
        Attributes: this.state.selectedAttributes,
      };
      axios
        .put(
          `${process.env.REACT_APP_API_BASE_URL}/types/${this.props.selectedTypeId}/attributes`,
          newMemorialTypesObject
        )
        .then((res) => {
          window.location = "/types";
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const newMemorialTypesObject = {
        Type: { Name: this.props.typeName, Icon: this.state.currentUrl },
        Attributes: this.state.selectedAttributes,
      };
      axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/types/attributes`,
          newMemorialTypesObject
        )
        .then((res) => {
          window.location = "/types";
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  toggleDeleteTypeModal = () => {
    this.setState({
      showDeleteModal: !this.state.showDeleteModal,
      deleteTypeInput: "",
      invalidTextInput: false,
    });
  };

  deleteType = () => {
    if (
      this.props.oldTypeName.toLowerCase() ===
      this.state.deleteTypeInput.toLowerCase()
    ) {
      this.setState({
        isSaving: true,
        invalidTextInput: false,
      });

      axios
        .delete(
          `${process.env.REACT_APP_API_BASE_URL}/types/${this.props.selectedTypeId}`
        )
        .then((res) => {
          window.location = "/types";
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.setState({
        invalidTextInput: true,
      });
    }
  };

  handleDeleteTypeInput = (event) => {
    this.setState({
      deleteTypeInput: event.target.value,
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
    let deletedAttributes = [];
    let attributeIds = [];

    for (let i = 0; i < selectedAttributes.length; i++) {
      attributeIds[i] = selectedAttributes[i].Id;
    }
    for (let i = 0; i < oldAttributes.length; i++) {
      if (attributeIds.includes(oldAttributes[i].Id)) {
        remainingAttributeCount++;
      } else {
        deletedAttributes.push(oldAttributes[i].Name);
      }
    }

    let deletedAttributeCount = oldAttributes.length - remainingAttributeCount;
    this.setState({
      deletedAttributeCount: deletedAttributeCount,
      deletedAttributes: deletedAttributes,
    });
  };
  
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  handleIconOnClick = url => {
    this.setState({
      currentUrl: url,
      visible: false,
      showSaveButton: true,
    });
  }

  render() {
    const showSaveButton =
      this.state.showSaveButton || this.props.isTypeNameChanged;
    const isExistingType = this.props.selectedTypeId;
    const isSaving = this.state.isSaving;
    const showPopup = this.state.showPopup;

    const filteredAttributes = this.state.allAttributes.filter(
      (attribute) => !this.state.selectedAttributes.includes(attribute)
    );

    let currentUrl = this.state.currentUrl;

    return (
      <div className={styles.attributes}>
        <div className={styles.iconWrapper}>
          <Button className={styles.iconButton} type="primary" onClick={this.showModal}>
            Choose an icon
          </Button>
          <img 
            className={styles.icons}
            src={currentUrl}
            alt=""
          />
        </div>
        <Modal
          title="Choose an icon"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Cancel
            </Button>
          ]}
        >
          {this.state.imageArray}
        </Modal>
        {
          <Select
            className={styles.attributesDropdown}
            placeholder="Add an Attribute..."
            onChange={this.onAttributeClick}
            showSearch={true}
            value={null}
            size="medium"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {filteredAttributes.map((attribute) => (
              <Select.Option value={attribute.Id}>
                {attribute.Name}
              </Select.Option>
            ))}
          </Select>
        }
        <table>
          <tbody>
            <tr className={styles.tableHeader}>
              <td></td>
              <td>Label</td>
              <td>Data Type</td>
              <td>Required</td>
            </tr>
            {this.state.selectedAttributes.map((item, n) => (
              <tr key={n}>
                {item.Name.toLowerCase() === "longitude" ||
                item.Name.toLowerCase() === "latitude"
                  ? [
                      <td>
                        <img
                          alt=""
                          className={styles.hiddenDeleteAttributeButton}
                          src={deleteAttributeButton}
                        />
                      </td>,
                      <td>
                        <Input
                          type="text"
                          key={item.Id}
                          value={item.Name}
                          disabled="disabled"
                        />
                      </td>,
                      <td>
                        <Input
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
                        <div className={styles.deleteAttributeWrapper}>
                          <img
                            alt=""
                            className={styles.deleteAttributeButton}
                            src={deleteAttributeButton}
                            onClick={() => this.deleteAttribute(item.Id)}
                          />
                        </div>
                      </td>,
                      <td>
                        <Input
                          type="text"
                          key={item.Id}
                          value={item.Name}
                          disabled="disabled"
                        />
                      </td>,
                      <td>
                        <Input
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
        <div>
          {showSaveButton && isExistingType && (
            <div className={styles.saveButtonWrapper}>
              <Button
                type="primary"
                onClick={() => this.togglePopup()}
                disabled={isSaving}
                block
              >
                Save Type
              </Button>
            </div>
          )}
          {!isExistingType && (
            <div className={styles.saveButtonWrapper}>
              <Button
                type="primary"
                onClick={() => this.saveAttributes()}
                disabled={isSaving}
                block
              >
                Save Type
              </Button>
            </div>
          )}
          <div className={styles.deleteButtonWrapper}>
            {isExistingType ? (
              <Button
                type="danger"
                onClick={() => this.toggleDeleteTypeModal()}
                disabled={isSaving}
                block
              >
                Delete Type
              </Button>
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
            visible={showPopup}
          />
        )}
        <Modal
          className={styles.modal}
          visible={this.state.showDeleteModal}
          onOk={this.deleteType}
          onCancel={this.toggleDeleteTypeModal}
        >
          <p>Enter "{this.props.oldTypeName}" and click OK to delete type.</p>
          <Input
            type="text"
            value={this.state.deleteTypeInput}
            onChange={this.handleDeleteTypeInput}
          />
          {this.state.invalidTextInput && (
            <p className={styles.invalidTypeName}>Incorrect type name</p>
          )}
        </Modal>
      </div>
    );
  }
}

export default Attributes;
