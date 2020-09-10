import React from "react";
import axios from "axios";

import styles from "./TaggerForm.module.css";
import AttributeForm from "./AttributeForm/AttributeForm";
import attributes from "../MemorialTypes/Attributes/Attributes";

class TaggerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memorialTypes: [
        {
          name: "Tree",
          id: "asdjadpj0912u309123ui",
          attributes: [
            {
              name: "longitude",
              type: "number",
              required: true,
              id: "3203sebg20t4",
            },
            {
              name: "latitude",
              type: "number",
              required: true,
              id: "32032sgbf0t4",
            },
            {
              name: "Donor",
              type: "words",
              required: false,
              id: "320aw3rfads320t4",
            },
            {
              name: "Date Planted",
              type: "date",
              required: false,
              id: "32032awr30t4",
            },
          ],
        },
        {
          name: "Art",
          id: "aodhjasegrd098u2309",
          attributes: [
            {
              name: "longitude",
              type: "number",
              required: null,
              id: "3203stravs20t4",
            },
            {
              name: "latitude",
              type: "number",
              required: false,
              id: "32erdgf0320t4",
            },
            {
              name: "Donor",
              type: "words",
              required: false,
              id: "320320tavsdff434",
            },
            {
              name: "Date Placed",
              type: "date",
              required: false,
              id: "32032asvdf0t4",
            },
          ],
        },
        {
          name: "Bench",
          id: "jmda0dj021asvdf9jd102",
          attributes: [
            {
              name: "longitude",
              type: "number",
              required: null,
              id: "320asvdfhgd320t4",
            },
            {
              name: "latitude",
              type: "number",
              required: false,
              id: "32032htrrrerh0t4",
            },
            {
              name: "Donor",
              type: "words",
              required: false,
              id: "3203afwehg20t4",
            },
            {
              name: "Date Placed",
              type: "date",
              required: false,
              id: "32032egtryt0t4",
            },
          ],
        },
      ],
      typeSelectedIndex: null,
      error: null,
      isLoaded: false,
      selectedFile: null,
      memorial: {
        name: "",
        memorialTypeId: "",
        attributes: [{ value: "", memorialTypeAttributeId: "", isValid: null }],
      },
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

  dropDownChange = (event) => {
    const memorialType = [...this.state.memorialTypes][event.target.value];
    const memorial = {};
    memorial.type = memorialType.name;
    memorial.attributes = memorialType.attributes.map((attribute) => {
      return { name: attribute.name, type: attribute.value };
    });

    this.setState({
      typeSelectedIndex: event.target.value,
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

 saveMemorialHandler = (event) => {
    // event.preventDefault();
    
    //   const memorial = {};
    //   memorial.attributes = memorialType.attributes.map((attribute) => {
    //     return { name: attribute.name, type: attribute.value, isValid: attribute.isValid };
    //   });
    //   this.setState({ 
    //     submitMessage: "" });
    //   axios
    //     .post("http://localhost:1337/memorials", {
    //       memorials: this.state.memorials,
    //     })
    //     .then((res) => this.setState({ submitMessage: "Memorial submitted" }))
    //      .catch((err) => console.log(err))
    
  
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
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      coordsButtonClicked: true
    });
  };

  imageButtonHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0]
    })
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
        <label>Memorial Types</label>
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
            </option>
          ))}
        </select>

        {!this.state.typeSelectedIndex ? (
          ""
        ) : (
          <div className={styles.attributesWrapper}>
            <AttributeForm
              memorialType={
                this.state.memorialTypes[this.state.typeSelectedIndex]
              }
              lat={this.state.latitude}
              lng={this.state.longitude}
              coordsButtonClicked={this.state.coordsButtonClicked}
            />
            <br />
            <button
              className={styles.saveMemorialButton}
              variant="primary"
              type="submit"
              onchange={this.saveMemorialHandler}
            >
              Save Memorial
            </button>

            <button
              className={styles.autoGenerateButton}
              variant="primary"
              type="submit"
              onClick={this.getLocationHandler}
            >
              Auto Generate Lat and Long
            </button>

            <div className="App">
              <input type="file" onChange={this.imageButtonHandler}/>
              <button onClick={this.fileUploadHandler}>Upload</button>
            </div>

            {
              //} {attribute.name == this.state.latitude ? attribute.name == this.state.longitude: "gls"}}
            }
          </div>
        )}
      </div>
    );
  }
}

export default TaggerForm;
