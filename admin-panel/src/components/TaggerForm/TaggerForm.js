import React from "react";
import axios from "axios";
import lodash from "lodash";
import cx from "classnames";

import styles from "./TaggerForm.module.css";
import AttributeForm from "./AttributeForm/AttributeForm";
import { Input, Button } from "antd";

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
          isValid: true,
        },
      ],
    },
    typeSelectedIndex: null,
    error: null,
    isLoading: true,
    isSaving: false,
    areCoordsValid: true,
    isMemorialNameValid: true,
    selectedFile: null,
  };

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/types/attributes`).then(
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
      isMemorialNameValid: true,
    });
  };

  onValueChange = (attributeId, value, isValid) => {
    const memorial = { ...this.state.Memorial };
    memorial.Attributes.forEach((attribute) => {
      if (attribute.Id === attributeId) {
        attribute.Value = value;
        attribute.isValid = isValid;
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
            areCoordsValid: true,
          });
        });
      } else {
        alert("Unable to get geolocation..");
      }
    });
  };

  onSaveMemorialClick = () => {
    this.setState({
      isSaving: true,
    });
    let areCoordsValid = true;
    let isValid = true;
    let isMemorialNameValid = this.state.Memorial.Name;

    this.state.Memorial.Attributes.forEach((attribute) => {
      if (attribute.isValid === false) {
        isValid = false;
      }
      if (attribute.Name.toLowerCase() === "latitude" && !attribute.Value) {
        areCoordsValid = false;
      }
      if (attribute.Name.toLowerCase() === "longitude" && !attribute.Value) {
        areCoordsValid = false;
      }
    });

    if (isValid && areCoordsValid && isMemorialNameValid) {
      axios
        .post(`${process.env.REACT_APP_API_BASE_URL}/memorials/values`, this.state.Memorial)
        .then(() => window.location = "/tagger-form");
    } else {
      this.setState({
        areCoordsValid: areCoordsValid,
        isSaving: false,
        isMemorialNameValid: isMemorialNameValid,
      });
      alert("Please fix Errors before saving!");
    }
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
        <div className={styles.dropDownWrapper}>
          <div className={styles.dropDownHeader}>Memorial Type</div>
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
              <Input
                className={styles.memorialNameInput}
                type="text"
                onChange={this.onMemorialNameChange}
                maxLength={50}
              />
              {this.state.isMemorialNameValid ? null : (
                <div
                  className={
                    this.state.isMemorialNameValid
                      ? styles.noMemorialNameError
                      : styles.memorialNameError
                  }
                >
                  Memorial Name can't be empty.
                </div>
              )}
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
                memorialName={this.state.Memorial.Name}
              />
            </div>
            {this.state.areCoordsValid ? null : (
              <div
                className={
                  this.state.areCoordsValid
                    ? styles.noCoordsError
                    : styles.coordsError
                }
              >
                Coordinates can't be empty.
              </div>
            )}
            <div className={styles.buttonsWrapper}>
              <div className={styles.fillCoordinatesButtonWrapper}>
                <Button
                  type="primary"
                  className={styles.fillCoordinatesButton}
                  onClick={this.onFillCoordinatesClick}
                >
                  Fill Coordinates
                </Button>
              </div>
              <div className={styles.uploadButtonWrapper}>
                <input style={{ display: "none" }} type="file" />
                <Button
                  type="primary"
                  onClick={() => this.fileUploadHandler}
                  className={styles.uploadButton}
                >
                  Upload/Capture Image
                </Button>
              </div>
            </div>

            <div className={styles.saveButtonWrapper}>
              <Button
                type="primary"
                style={{ background: "green", border: "green" }}
                className={cx(styles.saveMemorialButton, {
                  [styles.disabledButton]: this.state.isSaving,
                })}
                onClick={this.onSaveMemorialClick}
              >
                {this.state.isSaving ? (
                  <div>Saving... </div>
                ) : (
                  <div>Save Memorial</div>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default TaggerForm;
