import React from "react";
import cx from "classnames";

import styles from "./Attribute.module.css";
import { Input } from "antd";

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

  validateWords = (inputValue) => true;

  validateDate = (inputValue) =>
    /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/.test(inputValue);

  validateYesNo = (inputValue) => true;

  onValueChange = (event) => {
    const value = event.target.value;
    const isValid = this.validateInput(value.trim());
    this.setState({
      inputFocus: true,
      isValid: isValid,
      Value: value,
    });
    this.props.onValueChange(this.props.Id, value.trim(), isValid);
  };

  onValueInputBlur = (event) => {
    this.setState({
      inputFocus: false,
    });
  };

  getErrorMessage = () => {
    const errorMessages = {
      Date: "Date Format: MM/DD/YYYY.",
      Number: "Invalid number.",
    };
    return errorMessages[this.props.ValueType];
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
      <Input
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
        maxLength={248}
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
          <Input
            className={styles.valueTypeInput}
            type="text"
            name="valueTypeTextBox"
            readOnly
            value={this.props.ValueType}
          />
        </td>
      </tr>,
      <tr key={"errorMessage"}>
        <td></td>
        <td>
          <div
            className={
              !this.state.isValid && !this.state.inputFocus
                ? styles.error
                : styles.noError
            }
          >
            {this.getErrorMessage()}
          </div>
        </td>
        <td></td>
      </tr>,
    ];
  }
}

export default Attribute;
