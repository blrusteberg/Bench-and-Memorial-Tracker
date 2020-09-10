import React from "react";

import styles from "./AttributeForm.module.css";
import Attribute from "./Attribute/Attribute";

/*
    memorial: {
    name: "Wood Bench",
    memorialTypeId: "jmda0dj0219jd102",
    attributes: [
        {
        value: "12.202020",
        memorialTypeAttributeId: "ads214",
        },
    ],
    }
*/

class AttributeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: true,
    };
  }

  render() {
    return (
      <div className={styles.divBox}>
        <table>
          <tr className = {styles.tableHeader}>
            <tc></tc>
            <tc className = {styles.valueHeader}>Value</tc>
            <tc className = {styles.valueTypeHeader}>Value Type</tc>
          </tr>

          {this.props.memorialType.attributes.map((attribute, index) => (
            <tr>
            <Attribute
              name={attribute.name}
              type={attribute.type}
              required={attribute.required}
              typeId={attribute.id}
              key={index}
              lat={this.props.lat}
              lng={this.props.lng}
              coordsButtonClicked={this.props.coordsButtonClicked}
            />
            </tr>
          ))}
        </table>
      </div>
    );
  }
}

export default AttributeForm;
