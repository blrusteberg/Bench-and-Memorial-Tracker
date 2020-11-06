import React from "react";
import { DatePicker, Form, Input, InputNumber, Select } from "antd";

import ValueInput from "../../../../../common/ValueInput/ValueInput";

const AttributesForm = ({ Attributes, ...restProps }) =>
  Attributes.map((attribute) => {
    return (
      <Form.Item
        {...restProps}
        key={attribute.Id}
        label={attribute.Name}
        name={[
          "Type",
          "Attributes",
          (attribute.Value && attribute.Value.Id) || attribute.Id,
        ]}
      >
        <ValueInput valueType={attribute.ValueType} />
      </Form.Item>
    );
  });

export default AttributesForm;
