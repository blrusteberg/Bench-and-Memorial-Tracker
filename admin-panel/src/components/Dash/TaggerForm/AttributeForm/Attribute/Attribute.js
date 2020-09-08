import React from "react";

import styles from "./Attribute.module.css";

class Attribute extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputValue: " ", isValid: false };
  }

  validateNumber = (required) => {
    console.log("Validating number...");
    // validate input here
  };

  validateWords = (required) => {
    console.log("Validating words...");
    var regex = /^[A-Za-z_ ]+$/;
    if (regex.test(required)) {
      console.log("word is valid...");
      return true;
    } else {
      console.log("word is invalid...");
      return false;
    }
  };

  validateBoolean = (required) => {
    console.log("Validating boolean...");
    // validate input here
  };

  validateDate = (required) => {
    console.log("Validating date...");
    // validate input here
    // form: mm/dd/yyyy using regex
  };

  handleAttributeBoxChange = (event) => {
    //while (this.state.isValid == false) {
    console.log("handle attribute called");
    //var regex = this.validateWords(event.target.value);
    // } else if (this.props.type == "number") {
    //} else if (this.props.type == "date") {
    //} else if (this.props.type == "Yes/No") {
    //}

    //}

    //console.log(regex)
    this.setState({
      inputValue: event.target.value,
      isValid: event.target.isValid,
    });
  };

  updateInput = (event) => {
    // Blur Function
    console.log(event.target.value);
    var regex = this.validateWords(event.target.value);
    console.log(regex);

    this.setState({
      inputValue: event.target.value,
      isValid: regex,
    });
  };

  render() {
    const type = this.props.type;
    const validateFunctionName = `validate${
      type.charAt(0).toUpperCase() + type.slice(1)
    }`;

    console.log(validateFunctionName);
    //onClick={() => this[validateFunctionName](this.props.required)}
    // use this for adding valid/invalid input styling className={this.state.isValid ? styles.validInput : styles.invalidInput
    return (
      <table>
        <tr>
          <td></td>
          <td>
            <div className={styles.inputLabel}>{this.props.name}</div>
          </td>
        </tr>
        <tr>
          <td
            classname={
              this.state.isValid ? styles.validInput : styles.invalidInput
            }
          >
            *
          </td>
          <td>
            <input
              className={styles.attributeTextBox}
              type="text"
              name="attributeTextBox"
              id="attributeTextBox"
              value={
                this.props.name == "latitude"
                  ? this.props.lat
                  : this.props.name == "longitude"
                  ? this.props.lng
                  : this.state.inputValue
              }
              onChange={this.handleAttributeBoxChange}
              onBlur={() => this[validateFunctionName](this.props.required)}
            />
            <tr id="error"> </tr>
          </td>
          <td>
            <input
              className={styles.valueTextBox}
              type="text"
              name="valueTextBox"
              readOnly
              placeholder={this.props.type}
            />
          </td>
        </tr>
        <tr>
          <td></td>
          {
            //Error label goes here
          }
        </tr>
      </table>
    );
  }
}

export default Attribute;
