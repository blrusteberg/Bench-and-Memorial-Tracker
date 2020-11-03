import React, { StrictMode } from "react";
import cx from "classnames";

import styles from "./Attribute.module.css";
import { Input } from "antd";
import ValueInput from "../../../../common/ValueInput/ValueInput";

class Attribute extends React.Component {
  state = {
    inputFocus: false,
    isValid: true,
    Value: "",
  };

  componentDidUpdate(prevProps) {
    if (prevProps.Value !== this.props.Value) {
      this.setState({ isValid: this.state.isValid, Value: this.props.Value });
    }
  }

  onValueChange = (value) => {
    console.log("Value:", value);
    const isValid = value.trim();
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
      Words: "Invalid Word",
      YesNo: "Invalid Yes/No",
    };
    if (this.props.ValueType === "Yes/No") {
      return errorMessages.YesNo;
    } else {
      return errorMessages[this.props.ValueType];
    }
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

      default:
        return "";
    }
  };

  // switch (this.props.ValueType) {
  //   case "Words":
  //     return (
  //       <Input
  //         className={cx(styles.valueInput, {
  //           [styles.valueInputDisabled]: this.isInputDisabled(),
  //           [styles.valueInputInvalid]:
  //             !this.state.isValid && !this.state.inputFocus,
  //         })}
  //         type="text"
  //         name="attributeTextBox"
  //         id={this.props.Id}
  //         value={this.state.Value}
  //         readOnly={this.props.readOnly}
  //         onChange={(event) => this.onValueChange(event.target.value)}
  //         onBlur={this.onValueInputBlur}
  //         maxLength={248}
  //       />
  //     );

  //   case "Number":
  //     return (
  //       <Input
  //         className={cx(styles.valueInput, {
  //           [styles.valueInputDisabled]: this.isInputDisabled(),
  //           [styles.valueInputInvalid]:
  //             !this.state.isValid && !this.state.inputFocus,
  //         })}
  //         type="text"
  //         name="attributeTextBox"
  //         id={this.props.Id}
  //         value={this.state.Value}
  //         readOnly={this.props.readOnly}
  //         onChange={(event) => this.onValueChange(event.target.value)}
  //         onBlur={this.onValueInputBlur}
  //         maxLength={248}
  //       />
  //     );

  //   case "Date":
  //     return (
  //       <DatePicker
  //         format={"MM/DD/YYYY"}
  //         className={cx(styles.valueInput, {
  //           [styles.valueInputDisabled]: this.isInputDisabled(),
  //           [styles.valueInputInvalid]:
  //             !this.state.isValid && !this.state.inputFocus,
  //         })}
  //         type="text"
  //         name="attributeTextBox"
  //         id={this.props.Id}
  //         value={this.state.Value}
  //         readOnly={this.props.readOnly}
  //         onChange={(value) => this.onValueChange(value.format("MM/DD/YYYY"))}
  //         onBlur={this.onValueInputBlur}
  //         maxLength={248}
  //         placeholder={"MM/DD/YYYY"}
  //       />
  //     );

  //   case "Yes/No":
  //     return (
  //       <select
  //         className={styles.yesNoInput}
  //         onChange={(event) => this.onValueChange(event.target.value)}
  //       >
  //         {this.state.Value === "" ? <option>Select a value</option> : null}
  //         <option value={true}>Yes</option>
  //         <option value={false}>No</option>
  //       </select>
  //     );

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
