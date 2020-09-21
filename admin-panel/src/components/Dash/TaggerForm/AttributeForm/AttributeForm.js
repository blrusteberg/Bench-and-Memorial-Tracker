import React from "react";
import axios from "axios";

import styles from "./AttributeForm.module.css";
import Attribute from "./Attribute/Attribute";

class AttributeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: true,
      error: "Error",
      latitude: "",
      longitude: "",
      sortedAttributes: [
        {
          Id: "",
          Name: "",
          ValueType: "",
          Required: null,
          Value: null,
        },
      ],
    };
  }

  componentDidMount() {
    const sortedAttributes = [];
    this.props.Attributes.forEach((attribute) => {
      const name = attribute.Name.toLowerCase();
      name === "latitude" || name === "longitude"
        ? sortedAttributes.unshift(attribute)
        : sortedAttributes.push(attribute);
    });
    this.setState({ sortedAttributes: sortedAttributes });
  }

  onValueChange = (attributeId, value) =>
    this.props.onValueChange(attributeId, value);

  render() {
    return (
      <div className={styles.divBox}>
        <table className={styles.attributeForm}>
          <tbody>
            <tr className={styles.tableHeader}>
              <td></td>
              <td className={styles.valueHeader}>Value</td>
              <td className={styles.valueTypeHeader}>Value Type</td>
            </tr>
            {this.state.sortedAttributes.map((attribute, index) => {
              if (index === 0) {
                return (
                  <Attribute
                    index={index}
                    key={attribute.Id}
                    Id={attribute.Id}
                    Name={attribute.Name}
                    ValueType={attribute.ValueType}
                    Required={attribute.Required}
                    onValueChange={this.onValueChange}
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
                    onValueChange={this.onValueChange}
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
                  onValueChange={this.onValueChange}
                  Value={""}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default AttributeForm;
