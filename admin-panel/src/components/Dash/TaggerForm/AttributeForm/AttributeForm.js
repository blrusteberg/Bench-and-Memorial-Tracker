import React from "react";

import styles from "./AttributeForm.module.css";
import Attribute from "./Attribute/Attribute";
import attributes from "../../MemorialTypes/Attributes/Attributes";

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
          <tbody>
            <tr className={styles.tableHeader}>
              <td></td>
              <td className={styles.valueHeader}>Value</td>
              <td className={styles.valueTypeHeader}>Value Type</td>
            </tr>

            {this.props.memorialTypes.attributes.map((attribute, index) => (
              <tr key={attribute._id}>
                <td>
                  <Attribute
                    name={attribute.name}
                    type={attribute.dataType}
                    required={attribute.required}
                    typeId={attribute._id}
                    key={index}
                    lat={this.props.lat}
                    lng={this.props.lng}
                    coordsButtonClicked={this.props.coordsButtonClicked}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default AttributeForm;
