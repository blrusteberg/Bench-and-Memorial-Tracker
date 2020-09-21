import React from "react";
import cx from "classnames";

import styles from "./Attribute.module.css";

class Attribute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputFocus: false,
      isValid: true,
      Value: "",
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.Value !== this.props.Value) {
      this.setState({ isValid: this.state.isValid, Value: this.props.Value });
    }
  }

  validateInput = (value) => {
    if (this.props.ValueType === "Yes/No") {
      return this.validateYesNo(value);
    }
    return this[`validate${this.props.ValueType}`](value);
  };

  validateNumber = (inputValue) => /^(\d|-)?(\d|,)*\.?\d*$/.test(inputValue);

  validateWords = (inputValue) => {
    inputValue = inputValue.trim().toLowerCase();
    return inputValue !== "latitude" && inputValue !== "longitude";
  };

  validateDate = (inputValue) =>
    /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/.test(inputValue);

  validateYesNo = (inputValue) => true;

  onValueChange = (event) => {
    const value = event.target.value;
    const isValid = this.validateInput(value);
    this.setState({
      inputFocus: true,
      isValid: isValid,
      Value: value,
    });
    this.props.onValueChange(this.props.Id, value);
  };

  onValueInputBlur = (event) => {
    this.setState({
      inputFocus: false,
    });
  };

  getErrorMessage = (valueType) => {
    const errorMessages = {
      Date: "Dates must be in the form: MM/DD/YYYY.",
      Number: "Invalid number",
      Words: "Invalid input",
    };
    return errorMessages[valueType];
  };

  isInputDisabled = () => {
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

  getInputField = () => {
    return this.props.ValueType === "Yes/No" ? (
      <select className={styles.yesNoInput} onChange={this.onValueChange}>
        {this.state.Value === "" ? <option>Select a value</option> : null}
        <option value={true}>Yes</option>
        <option value={false}>No</option>
      </select>
    ) : (
      <input
        className={cx(styles.valueInput, {
          [styles.valueInputDisabled]: this.isInputDisabled(),
          [styles.valueInputInvalid]:
            !this.state.isValid && !this.state.inputFocus,
        })}
        type="text"
        name="attributeTextBox"
        id={this.props.Id}
        value={this.state.Value}
        readOnly={this.props.readOnly}
        onChange={this.onValueChange}
        onBlur={this.onValueInputBlur}
      />
    );
  };

  render() {
    return [
      <tr key={"attributeName"} className={styles.attribute}>
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
        <td>{this.getInputField()}</td>
        <td className={styles.valueTypeInputCell}>
          <input
            className={styles.valueTypeInput}
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
          {!this.state.isValid && !this.state.inputFocus ? (
            <div className={styles.error}>
              {() => this.getErrorMessage(this.props.ValueType)}
            </div>
          ) : null}
        </td>
        <td></td>
      </tr>,
    ];
  }
}

export default Attribute;
