import React from "react";
import cx from "classnames";

import styles from "./Attribute.module.css";

class Attribute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: true,
      longitude: "",
      latitude: "",
      inputValue: "",
    };
  }

  validateNumber = (inputValue) => /^(\d|-)?(\d|,)*\.?\d*$/.test(inputValue);

  validateWords = (inputValue) => true;

  validateDate = (inputValue) =>
    /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/.test(inputValue);

  validateYesNo = (inputValue) => /^(?:Yes|No)$/.test(inputValue);

  handleInputChange = (event) => {
    const inputValue = event.target.value;
    this.setState({
      inputValue: inputValue,
    });
    this.props.onValueInput(this.props.Id, inputValue);
  };

  handleInputValidation = (event) => {
    // Blur Function
    const type = this.props.ValueType;
    const validateFunctionName = `validate${
      type.charAt(0).toUpperCase() + type.slice(1)
    }`;

    const isValid = this[validateFunctionName](event.target.value);

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

  inputDisabled = () => {
    const attributeName = this.props.Name.toLowerCase();
    return attributeName === "latitude" || attributeName === "longitude";
  };

  getDisabledInputValue = () => {
    switch (this.props.Name.toLowerCase()) {
      case "latitude":
        return this.props.latitude;

      case "longitude":
        return this.props.longitude;
    }
  };

  render() {
    const inputDisabled = this.inputDisabled();
    return [
      <tr key={"attributeName"}>
        <td></td>
        <td>
          <div className={styles.inputLabel}>{this.props.Name}</div>
        </td>
        <td></td>
      </tr>,
      <tr key={"inputData"}>
        <td
          className={this.props.Required ? styles.required : styles.notRequired}
        >
          *
        </td>
        <td>
          <input
            className={cx(styles.valueInput, {
              [styles.valueInputDisabled]: inputDisabled,
              [styles.valueInputInvalid]: !this.state.isValid,
            })}
            type="text"
            name="attributeTextBox"
            id={this.props.Id}
            value={
              inputDisabled
                ? this.getDisabledInputValue()
                : this.state.inputValue
            }
            readOnly={inputDisabled}
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
      </tr>,
      <tr key={"errorMessage"}>
        <td></td>
        <td>
          <span className={this.state.isValid ? styles.noError : styles.error}>
            {this.getErrorMessage(this.props.ValueType)}
          </span>
        </td>
        <td></td>
      </tr>,
    ];
  }
}

export default Attribute;
