import React from "react";

import styles from "./Attribute.module.css";

class Attribute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: this.props.inputValue,
      isValid: true,
      longitude: 0.0,
      latitude: 0.0,
    };
  }

  validateNumber = (inputValue) => /^(\d|-)?(\d|,)*\.?\d*$/.test(inputValue);

  validateWords = (inputValue) => (inputValue = true);

  validateDate = (inputValue) =>
    /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/.test(inputValue);

  validateYesNo = (inputValue) => /^(?:Yes|No)$/.test(inputValue);

  handleInputChange = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
    //this.props.inputValueChange({
    // Value: event.target.value,
    // AttributeId: this.props.Id
    //})
  };

  handleInputValidation = (event) => {
    // Blur Function
    const type = this.props.ValueType;
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

    // FIX LATER: There needs to be 2 tables. 1st table inside a <td> that holds the first column. 2nd table for 2nd column that needs
    // empty td/trto compensate for the error message, and title so the inputs line up
    return (
      <tr key={attribute.Id}>
        <table>
          <tbody>
            <tr>
              <td></td>
              <td>
                <div className={styles.inputLabel}>{this.props.Name}</div>
              </td>
            </tr>
            <tr>
              <td>
                <div
                  className={
                    this.props.Required ? styles.required : styles.notRequired
                  }
                >
                  *
                </div>
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
                  id={this.props.Id}
                  value={
                    this.props.Name.toLowerCase() === "longitude"
                      ? this.props.longitude
                      : this.props.Name.toLowerCase() === "latitude"
                      ? this.props.latitude
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
                  placeholder={this.props.ValueType}
                />
              </td>
            </tr>
            <tr>
              <td></td>

              <td>
                <span
                  className={this.state.isValid ? styles.noError : styles.error}
                >
                  {this.getErrorMessage(this.props.ValueType)}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </tr>
    );
  }
}

export default Attribute;
