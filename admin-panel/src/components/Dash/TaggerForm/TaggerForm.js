import React from "react";
import axios from "axios";
import {
  Form,
  Button,
  FormControl,
  Container,
  Col,
  Row,
} from "react-bootstrap";

import styles from "./TaggerForm.module.css";

class TaggerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memorialTypes: [
        {
          name: "Tree",
          attributes: [
            { name: "longitude", value: "number", required: null },
            { name: "latitude", value: "number", required: false },
            { name: "Donor", value: "word", required: false },
            { name: "Date Planted", value: "date", required: false },
          ],
        },
        {
          name: "Art",
          attributes: [
            { name: "longitude", value: null, required: null },
            { name: "latitude", value: null, required: false },
            { name: "Donor", value: null, required: false },
            { name: "Date Placed", value: null, required: false },
          ],
        },
        {
          name: "Bench",
          attributes: [
            { name: "longitude", value: null, required: null },
            { name: "latitude", value: null, required: false },
            { name: "Donor", value: null, required: false },
            { name: "Date Placed", value: null, required: false },
          ],
        },
      ],
      memorials: [
        {
          type: null,
          attributes: [
            {
              name: null,
              value: null,
            },
          ],
        },
      ],
      typeSelectedIndex: null,
      error: null,
      isLoaded: false,
      submitMessage: "",
    };
  }

  componentDidMount() {
    axios.get("http://localhost:1337/memorials/types").then(
      (res) => {
        this.setState({
          memorialTypes: res.data.memorialTypes,
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

  dropDownChange(event) {
    const memorialType = [...this.state.memorialTypes][event.target.value];
    const memorial = {};
    memorial.type = memorialType.name;
    memorial.attributes = memorialType.attributes.map((attribute) => {
      return { name: attribute.name, value: attribute.value };
    });
    const newMemorials = [...this.state.memorials];
    newMemorials[0] = memorial;

    this.setState({
      typeSelectedIndex: event.target.value,
    });
    this.setState({ memorials: newMemorials });
  }

  inputChange(event, index) {
    const memorials = [...this.state.memorials];
    memorials[0].attributes[index].value = event.target.value;

    this.setState({ memorials: memorials });
  }

  taggerSubmitHandler(event) {
    event.preventDefault();
    this.setState({ submitMessage: "" });
    axios
      .post("http://localhost:1337/memorials", {
        memorials: this.state.memorials,
      })
      .then((res) => this.setState({ submitMessage: "Memorial submitted" }))
      .catch((err) => console.log(err));
  }

  getLocationHandler = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setCoordinates);
    } else {
      alert("Geolocation is not supportd by this browser");
    }
  };

  setCoordinates = (position) => {
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  };

  render() {
    return (
      <div id="container">
        ---------------------------------------------------------------------------------------------------------------------------------
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <label for="Memorial-Types">Memorial Types</label>
        <br />
        <select
          name="Memorial-Types"
          id="Memorial-Types"
          onChange={(event) => this.dropDownChange(event)}
        >
          {!this.state.typeSelectedIndex ? <option>Select a type</option> : ""}
          {this.state.memorialTypes.map((type, n) => (
            <option key={n} value={n}>
              {type.name}
              {type.value}
            </option>
          ))}
        </select>
        <br />
        <br />
        <br />
        <label id="value-label">Value__________</label>
        <label id="value-type-label">Value Type</label>
        <form onSubmit={(event) => this.taggerSubmitHandler(event)}>
          {!this.state.typeSelectedIndex ? (
            ""
          ) : (
            <form>
              {this.state.memorialTypes[
                this.state.typeSelectedIndex
              ].attributes.map((attribute, index) => (
                <div id="form123">
                  <label id="attribute-name">{attribute.name}</label>
                  <br />
                  <input type="text" name="attribute-text-box"></input>

                  <input
                    type="text"
                    name="value-text-box"
                    readOnly
                    placeholder={attribute.value}
                  ></input>

                  {/* <form
                    onChange={(event) => this.inputChange(event, index)}
                    className={styles.required}
                    placeholder={attribute.value}
                    required={attribute.required}
                  /> */}
                </div>
              ))}
              <br />

              <button variant="primary" type="submit">
                Save Memorial
              </button>
            </form>
          )}
        </form>
        <div className={styles.submitMessage}>{this.state.submitMessage}</div>
      </div>
    );
  }
}

export default TaggerForm;
