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
          style={{ width: "100%", fontSize: "1.3rem" }}
          size="large"
          rules=""
        />
      </Form.Item>
    );
  });
};

export default AttributeForm;
