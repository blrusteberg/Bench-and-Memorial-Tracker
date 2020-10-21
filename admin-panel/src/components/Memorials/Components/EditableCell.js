import React from "react";
import { Radio, Input, Form, Switch } from "antd";

import styles from "./EditableCell.module.css";

const getInputNode = (inputType) => {
  switch (inputType) {
    case "Words":
    case "Number":
    case "Date":
    default:
      return <Input maxLength={248} />;
    case "Yes/No":
      return (
        <Radio.Group>
          <Radio value={true}>Yes</Radio>
          <Radio value={false}>No</Radio>
        </Radio.Group>
      );
    case "boolean":
      return <Switch size="small" />;
  }
};

const getInputRules = (inputName, inputType, required) => {
  const rules = [
    {
      required: required,
      message: `${inputName} cannot be empty.`,
    },
  ];
  switch (inputType) {
    case "Yes/No":
    case "Words":
    default:
      break;
    case "Number":
      rules.push({
        pattern: /^(\d|-)?(\d|,)*\.?\d*$/,
        message: "Invalid number.",
      });
    case "Date":
      rules.push({
        pattern: /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/,
        message: "Date must be in the format MM/DD/YYYY.",
      });
  }
  return rules;
};

const validateInputType = (inputType) => {
  switch (inputType) {
    case "Words":
    case "Yes/No":
    case "Date":
    case "Number":
    case "boolean":
      return;
    default:
      throw new Error(
        'Incorrect input type given. Valid input types: "Words", "Yes/No", "Date", or "Number"'
      );
  }
};

const EditableCell = ({
  editing,
  dataIndex,
  inputType,
  record,
  children,
  inputRequired,
  ...restProps
}) => {
  if (editing) {
    validateInputType(inputType);
    if (typeof record === "undefined") {
      throw new Error("Prop 'record' is undefined.");
    }
  }
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          rules={getInputRules(dataIndex, inputType, inputRequired)}
          className={styles.FormItem}
        >
          {getInputNode(inputType, record.key)}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default EditableCell;
