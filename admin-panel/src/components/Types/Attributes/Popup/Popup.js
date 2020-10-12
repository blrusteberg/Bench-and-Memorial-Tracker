import React from "react";
import { Modal } from 'antd';

class Popup extends React.Component {
  render() {
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
              You are about to delete [{" "}
              {Object.values(this.props.deletedAttributes).map(
                (attribute) => attribute + " "
              )}
              ] attributes from "{this.props.oldTypeName}"
            </p>
          )}
          <p>Do you want to continue?</p>
        </Modal>
    );
  }
}

export default Popup;
