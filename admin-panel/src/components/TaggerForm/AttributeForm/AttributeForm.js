import React from "react";
import "antd/dist/antd.css";

import ValueInput from "../../../common/ValueInput/ValueInput";
import { Form } from "antd";

const AttributeForm = ({
  Attributes,
  latitude,
  longitude,
  memorialName,
  areCoordsValid,
  ...restProps
}) => {
  return Attributes.map((attribute, index) => {
    return (
      <Form.Item
        label={attribute.Name}
        key={index}
        name={[
          "Type",
          "Attributes",
          (attribute.Value && attribute.Value.Id) || attribute.Id,
        ]}
        {...restProps}
      >
        <ValueInput
          valueType={attribute.ValueType}
          style={{ maxWidth: 600, width: "100%" }}
          size="large"
          rules=""
        />
      </Form.Item>
    );
  });
};

export default AttributeForm;
