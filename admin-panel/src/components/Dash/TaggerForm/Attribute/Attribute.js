import React from "react";

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

class Attribute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: true,
    };
  }
  validateNumber = (required) => {
    console.log("Validating number...");
    // validate input here
  };

  validateWords = (required) => {
    console.log("Validating words...");
    // validate input here
  };

  validateBoolean = (required) => {
    console.log("Validating boolean...");
    // validate input here
  };

  validateDate = (required) => {
    console.log("Validating date...");
    // validate input here
    // form: mm/dd/yyyy using regex
  };

  render() {
    const type = this.props.type;
    const validateFunctionName = `validate${
      type.charAt(0).toUpperCase() + type.slice(1)
    }`;

    return (
      <div
        onClick={() => this[validateFunctionName](this.props.required)}
        // use this for adding valid/invalid input styling className={this.state.isValid ? styles.validInput : styles.invalidInput}
      >
        {this.props.name}
        {this.props.attributeId}
      </div>
    );

    /*
    <div>
        <label id={styles.attributeName}>{attribute.name}</label>
        <br />
        <input type="text" name="attribute-text-box" />
        <input
        type="text"
        name="value-text-box"
        readOnly
        placeholder={attribute.value}
        />
    </div>
    */
  }
}

export default Attribute;
