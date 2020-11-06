import React from "react";
import "antd/dist/antd.css";

import styles from "./AttributeForm.module.css";
import ValueInput from "../../../common/ValueInput/ValueInput";
import { Input, Form } from "antd";

const AttributeForm = ({
  Attributes,
  latitude,
  longitude,
  memorialName,
  areCoordsValid,
  ...restProps
}) => {
  return (
    <div className={styles.attributesDiv}>
      {Attributes.map((attribute, index) => {
        return (
          <Form.Item
            label={attribute.Name}
            name={[
              "Type",
              "Attributes",
              (attribute.Value && attribute.Value.Id) || attribute.Id,
            ]}
            {...restProps}
          >
            {attribute.Name.toLowerCase() === "latitude" ||
            attribute.Name.toLowerCase() === "longitude" ? (
              <Input
                value={
                  areCoordsValid && attribute.Name.toLowerCase() === "latitude"
                    ? latitude
                    : longitude
                }
                size="large"
                style={{ width: 200 }}
              ></Input>
            ) : (
              <ValueInput
                valueType={attribute.ValueType}
                style={{ width: 200 }}
                label={attribute.Name}
                size="large"
              />
            )}
          </Form.Item>
        );
      })}
    </div>
  );
};

export default AttributeForm;
