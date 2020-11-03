import React from "react";
import { DatePicker, Form, Input, InputNumber, Select } from "antd";

import ValueInput from "../../../../../common/ValueInput/ValueInput";

const { Option } = Select;

const AttributesForm = ({ Attributes, ...restProps }) => {
  return Attributes.map((attribute, index) => (
    <Form.Item
      label={attribute.Name}
      name={(attribute.Value && attribute.Value.Id) || index}
      key={attribute.Id}
      {...restProps}
    >
      <ValueInput valueType={attribute.ValueType} />
    </Form.Item>
  ));
};

export default AttributesForm;
