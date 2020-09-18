import React from "react";
import axios from "axios";

import styles from "./TaggerForm.module.css";
import AttributeForm from "./AttributeForm/AttributeForm";
import attributes from "../MemorialTypes/Attributes/Attributes";

class TaggerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Types: [
        {
          Name: "",
          Id: "",
        },
      ],
      MemorialData: {
        Memorial: {
          Name: "",
        },
        Values: [
          {
            Value: "",
            AttributeId: "",
          },
        ],
      },
      typeSelectedIndex: null,
      error: null,
      isLoaded: false,
      selectedFile: null,
    };
  }

  componentDidMount() {
    axios.get("http://localhost:1337/types").then(
      (res) => {
        this.setState({
          Types: res.data,
          isLoaded: true,
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error: error,
        });
      }
    );
  }

  dropDownChange = (event) => {
    this.setState({
      typeSelectedIndex: event.target.value,
      latitude: "",
      longitude: "",
    });
  };

  getLocationHandler = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setCoordinates);
    } else {
      alert("Geolocation is not supportd by this browser");
    }
  };

  setCoordinates = (position) => {
    this.setState({
      longitude: position.coords.longitude,
      latitude: position.coords.latitude,
    });
  };

  setMemorialValues = (Values) => {
    this.setState({
      MemorialData: {
        Values: [Values],
      },
    });
  };

  inputChange = (event, index) => {
    const memorials = [...this.state.memorials];
    memorials[0].attributes[index].value = event.target.value;

    this.setState({ memorials: memorials });
  };

  saveMemorialHandlerSubmitHandler = () => {
    // trigger on save memorial button click
    // loop through this.state.memorialAttributes, check if all isValid are true
    // also check if all required attributes have values
  };

  saveMemorialHandler = () => {
    console.log("SAVING MEMORIAL...");
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
    //     console.log(res);
    //   });
  };

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.dropDownWrapper}>
          <label>Memorial Types</label>
          <select
            name="Memorial-Types"
            id="Memorial-Types"
            onChange={(event) => this.dropDownChange(event)}
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
            <div className={styles.attributesWrapper}>
              <AttributeForm
                TypeId={this.state.Types[this.state.typeSelectedIndex].Id}
                Name={this.state.Name}
                key={this.state.Types[this.state.typeSelectedIndex].Id}
                setMemorialValues={this.setMemorialValues}
                latitude={this.state.latitude}
                longitude={this.state.longitude}
              />
            </div>
            <br />
            <div className={styles.buttonsWrapper}>
              <button
                className={styles.autoGenerateButton}
                variant="primary"
                type="submit"
                onClick={this.getLocationHandler}
              >
                Auto Generate Lat and Long
              </button>
              <div className={styles.uploadButtonDiv}>
                <input style={{ display: "none" }} type="file" />
                <button onClick={() => this.fileUploadHandler}>
                  Upload/Capture Image
                </button>
              </div>
            </div>
            <button
              className={styles.saveMemorialButton}
              variant="primary"
              type="submit"
              onClick={this.saveMemorialHandler}
            >
              Save Memorial
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default TaggerForm;
