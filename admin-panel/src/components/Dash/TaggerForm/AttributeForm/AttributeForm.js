import React from "react";
import axios from "axios";

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
      attributes: [
        {
          Id: "",
          Name: "",
          ValueType: "",
          Required: false,
        },
      ],
      sortedAttributes: [
        {
          Id: "",
          Name: "",
          ValueType: "",
          Required: false,
        },
      ],

      Values: [{ Value: "", AttributeId: "" }],
      error: "Error",
      lattitude: this.props.latitude,
      longitude: this.props.longitude,
    };
  }

  componentDidMount() {
    const url =
      "http://localhost:1337/types/" + this.props.TypeId + "/attributes";
    console.log(url);
    axios.get(url).then(
      (res) => {
        const sortedAttributes = [];
        res.data.forEach((attribute, index) => {
          attribute.Name.toLowerCase() == "longitude" ||
          attribute.Name.toLowerCase() == "latitude"
            ? sortedAttributes.unshift(res.data[index])
            : sortedAttributes.push(res.data[index]);
        });

        this.setState({
          sortedAttributes: sortedAttributes,
        });
      },
      (error) => {
        this.setState({
          error: error,
        });
      }
    );
  }

  onValueInput = (value, attributeId) => {
    const values = [...this.state.Values];
  };


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
            {this.state.sortedAttributes.map((attribute) => (
              <Attribute
                Id={attribute.Id}
                Name={attribute.Name}
                key={attribute.Id}
                ValueType={attribute.ValueType}
                Required={attribute.Required}
                longitude={this.props.longitude}
                latitude={this.props.latitude}
                onValueInput={this.onValueInput}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default AttributeForm;
