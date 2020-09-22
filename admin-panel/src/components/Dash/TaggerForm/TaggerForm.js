import React from "react";
import axios from "axios";
import lodash from "lodash";
import cx from "classnames";

import styles from "./TaggerForm.module.css";
import AttributeForm from "./AttributeForm/AttributeForm";

class TaggerForm extends React.Component {
  state = {
    Types: [
      {
        Id: "",
        Name: "",
        Attributes: [
          {
            Id: "",
            Name: "",
            ValueType: "",
            Required: null,
            Value: "",
          },
        ],
      },
    ],
    Memorial: {
      Name: "",
      TypeId: "",
      Attributes: [
        {
          Id: "",
          Name: "",
          ValueType: "",
          Required: null,
          Value: "",
        },
      ],
    },
    typeSelectedIndex: null,
    error: null,
    isLoading: true,
    isSaving: false,
    selectedFile: null,
  };

  componentDidMount() {
    axios.get("http://localhost:1337/types/attributes").then(
      (res) => {
        this.setState({
          Types: res.data,
          isLoading: false,
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error: false,
        });
      }
    );
  }

  onTypeSelect = (typeIndex) => {
    const attributes = lodash.cloneDeep(this.state.Types[typeIndex].Attributes);
    attributes.forEach((attribute) => (attribute.Value = ""));
    this.setState({
      Memorial: {
        Name: "",
        TypeId: this.state.Types[typeIndex].Id,
        Attributes: attributes,
      },
      typeSelectedIndex: typeIndex,
    });
  };

  onMemorialNameChange = (event) => {
    const memorial = { ...this.state.Memorial };
    memorial.Name = event.target.value;
    this.setState({
      Memorial: memorial,
    });
  };

  onValueChange = (attributeId, value) => {
    const memorial = { ...this.state.Memorial };
    memorial.Attributes.forEach((attribute) => {
      if (attribute.Id === attributeId) {
        attribute.Value = value;
      }
    });
    this.setState({
      Memorial: memorial,
    });
  };

  onFillCoordinatesClick = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      if (pos) {
        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;
        const memorial = { ...this.state.Memorial };
        memorial.Attributes.forEach((attribute) => {
          if (attribute.Name.toLowerCase() === "latitude") {
            attribute.Value = latitude;
          }
          if (attribute.Name.toLowerCase() === "longitude") {
            attribute.Value = longitude;
          }
          this.setState({
            latitude: latitude,
            longitude: longitude,
            Memorial: memorial,
          });
        });
      } else {
        alert("Unable to get geolocation..");
      }
    });
  };

  onSaveMemorialClick = () => {
    this.setState({
      isSave: true,
    });
    axios
      .post("http://localhost:1337/memorials/values", this.state.Memorial)
      .then(() => window.location.reload());
  };

  imageButtonHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
    });
  };

  fileUploadHandler = () => {
    const fd = new FormData();
    // fd.append('image', this.state.selectedFile, this.state.selectedFile.name)
    // axios.post("http://localhost:1337/memorials", fd)
    //   .then(res => {
    //   });
  };

  render() {
    return this.state.isLoading ? (
      <div className={styles.loadingTitle}>Loading...</div>
    ) : (
      <div className={styles.container}>
        <div className={styles.title}>Tagger Form</div>
        <div className={styles.dropDownWrapper}>
          <div>Memorial Type</div>
          <select
            name="Memorial-Types"
            id="Memorial-Types"
            onChange={(event) => this.onTypeSelect(event.target.value)}
          >
            {!this.state.typeSelectedIndex ? (
              <option>Select a type</option>
            ) : (
              ""
            )}
            {this.state.Types.map((type, n) => (
              <option key={type.Id} value={n}>
                {type.Name}
              </option>
            ))}
          </select>
        </div>
        {!this.state.typeSelectedIndex ? (
          ""
        ) : (
          <div>
            <div className={styles.memorialNameWrapper}>
              <div className={styles.memorialName}>Memorial Name</div>
              <input
                className={styles.memorialNameInput}
                type="text"
                onChange={this.onMemorialNameChange}
              />
            </div>
            <div className={styles.attributesWrapper}>
              <AttributeForm
                key={this.state.Types[this.state.typeSelectedIndex].Id}
                Attributes={
                  this.state.Types[this.state.typeSelectedIndex].Attributes
                }
                onValueChange={this.onValueChange}
                latitude={this.state.latitude}
                longitude={this.state.longitude}
              />
            </div>
            <div className={styles.buttonsWrapper}>
              <div className={styles.fillCoordinatesButtonWrapper}>
                <button
                  className={styles.fillCoordinatesButton}
                  onClick={this.onFillCoordinatesClick}
                >
                  Fill Coordinates
                </button>
              </div>
              <div className={styles.uploadButtonWrapper}>
                <input style={{ display: "none" }} type="file" />
                <button
                  onClick={() => this.fileUploadHandler}
                  className={styles.uploadButton}
                >
                  Upload/Capture Image
                </button>
              </div>
            </div>
            <div className={styles.saveButtonWrapper}>
              <button
                className={cx(styles.saveMemorialButton, {
                  [styles.disabledButton]: this.state.isSaving,
                })}
                onClick={this.onSaveMemorialClick}
              >
                Save Memorial
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default TaggerForm;
