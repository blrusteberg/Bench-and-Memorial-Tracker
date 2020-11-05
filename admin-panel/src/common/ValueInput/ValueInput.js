import React from "react";

import { Select, InputNumber, DatePicker, Input } from "antd";

const { Option } = Select;

const ValueInput = ({ valueType, size, ...restProps }) => {
  const getInputNode = () => {
    const props = { size: size, ...restProps };
    let inputNode = null;

    switch (valueType) {
      case "Words":
        inputNode = <Input maxLength={248} {...props} />;
        break;

      case "Number":
        inputNode = (
          <InputNumber style={{ width: "100%" }} maxLength={248} {...props} />
        );
        break;

      case "Date":
        inputNode = <DatePicker format={"MM/DD/YYYY"} {...props} />;
        break;

      case "Yes/No":
        inputNode = (
          <Select {...props}>
            <Option key={"yes"} value={true}>
              Yes
            </Option>
            <Option key={"no"} value={false}>
              No
            </Option>
          </Select>
        );
        break;

      default:
        throw new Error("Input value type is not valid.");
    }
    return inputNode;
  };

  return getInputNode();
};

export default ValueInput;
