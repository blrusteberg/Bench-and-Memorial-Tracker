import React from "react";

import styles from "./Attribute.module.css";

class Attribute extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputValue: " ", isValid: true };
  }

  validateNumber = (inputValue) => /[+-]?([0-9]*[.])?[0-9]+/.test(inputValue);

  validateWords = (inputValue) => (inputValue = true);

  validateDate = (inputValue) =>
    /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/.test(inputValue);

  handleInputChange = (event) => {
    // console.log(this.props.coordsButtonClicked)
    // event.target.value =
    //this.props.name == "latitude" && this.props.coordsButtonClicked == true
    // ? this.props.lat
    //: this.props.name == "longitude" && this.props.coordsButtonClicked == true
    //? this.props.lng
    // : this.state.inputValue;

    this.setState({
      inputValue: event.target.value,
    });
  };

  handleInputValidation = (event) => {
    // Blur Function
    const type = this.props.type;
    const validateFunctionName = `validate${
      type.charAt(0).toUpperCase() + type.slice(1)
    }`;

    const isValid = this[validateFunctionName](event.target.value);
    console.log(isValid);

    this.setState({
      inputValue: event.target.value,
      isValid: isValid,
    });
  };

  getErrorMessage = (type) => {
    const errorMessages = {
      date: "Invalid. Try MM/DD/YYYY.",
      number: "Your number is invalid.",
      words: "Everything is a word.",
    };
    return errorMessages[type];
  };

  render() {
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
          <td>
            <div classname={styles.validInput}></div>
          </td>
          <td>
            <input
              className={
                this.state.isValid
                  ? styles.attributeTextBox
                  : styles.invalidInput
              }
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
              onChange={this.handleInputChange}
              onBlur={this.handleInputValidation}
            />
          </td>
          <td>
            <input
              className={styles.valueTypeTextBox}
              type="text"
              name="valueTypeTextBox"
              readOnly
              placeholder={this.props.type}
            />
          </td>
        </tr>
        <tr>
          <td></td>
          <tr>
            <span
              className={this.state.isValid ? styles.noError : styles.error}
            >
              {this.getErrorMessage(this.props.type)}
            </span>
          </tr>
        </tr>
      </table>
    );
  }
}

export default Attribute;
