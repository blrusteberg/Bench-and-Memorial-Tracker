import React from "react";
import { Modal } from 'antd';

class Popup extends React.Component {
  render() {
    let attributesString = ""
    for(let i=0; i<this.props.deletedAttributes.length; i++){
      attributesString += this.props.deletedAttributes[i] + ", ";
    }
    attributesString = attributesString.substring(0, attributesString.length - 2);
    return (
        <Modal
          onOk={this.props.saveAttributes}
          onCancel={this.props.closePopup}
          visible={this.props.visible}
        >
          {this.props.oldTypeName !== this.props.newTypeName && (
            <p>
              You are about to change "{this.props.oldTypeName}" to "
              {this.props.newTypeName}"
            </p>
          )}
          {this.props.deletedAttributeCount > 0 && (
            <p>
              You are about to delete 
              {" "}{attributesString}{" "}
               attributes from "{this.props.oldTypeName}"
            </p>
          )}
          <p>Do you want to continue?</p>
        </Modal>
    );
  }
}

export default Popup;
