import React from "react";

import styles from "./AttributeForm.module.css";
import ValueInput from "../../../common/ValueInput/ValueInput";

const AttributeForm = ({ Attributes }) => {
  return (
    <table className={styles.attributeForm}>
      <tbody>
        <tr className={styles.tableHeader}>
          <td></td>
          <td className={styles.valueHeader}>Value</td>
          <td className={styles.valueTypeHeader}>Value Type</td>
        </tr>
        {Attributes.map((attribute, index) => {
          return <ValueInput valueType={attribute.ValueType} size="large" />;

          {
            /* if (index === 0) {
              return (
                <Attribute
                  index={index}
                  key={attribute.Id}
                  Id={attribute.Id}
                  Name={attribute.Name}
                  ValueType={attribute.ValueType}
                  Required={attribute.Required}
                  onValueChange={this.props.onValueChange}
                  readOnly={true}
                  Value={this.props.latitude}
                />
              );
            }
            if (index === 1) {
              return (
                <Attribute
                  index={index}
                  key={attribute.Id}
                  Id={attribute.Id}
                  Name={attribute.Name}
                  ValueType={attribute.ValueType}
                  Required={attribute.Required}
                  onValueChange={this.props.onValueChange}
                  readOnly={true}
                  Value={this.props.longitude}
                />
              );
            }
            return (
              <Attribute
                index={index}
                key={attribute.Id}
                Id={attribute.Id}
                Name={attribute.Name}
                ValueType={attribute.ValueType}
                Required={attribute.Required}
                onValueChange={this.props.onValueChange}
                Value={""}
              />
            ); */
          }
        })}
      </tbody>
    </table>
  );
};

export default AttributeForm;
