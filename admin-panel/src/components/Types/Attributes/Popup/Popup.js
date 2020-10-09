import React from "react";
import styles from "./Popup.module.css";
import closeWindow from "../../../../assets/closeWindow.png";
import { Modal, Button } from 'antd';

class Popup extends React.Component {
  render() {
    console.log(this.props.visible);
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
      // <div className={styles.popup}>
      //   <div className={styles.popup_inner}>
      //     <img
      //       className={styles.closeWindow}
      //       src={closeWindow}
      //       onClick={this.props.closePopup}
      //     ></img>
      //     <br />
      //     <br />
      //     <div className={styles.popup_innerText}>
      //       {this.props.oldTypeName !== this.props.newTypeName && (
      //         <div>
      //           You are about to change "{this.props.oldTypeName}" to "
      //           {this.props.newTypeName}"
      //         </div>
      //       )}
      //       {this.props.deletedAttributeCount > 0 && (
      //         <div>
      //           You are about to delete [{" "}
      //           {Object.values(this.props.deletedAttributes).map(
      //             (attribute) => attribute + " "
      //           )}
      //           ] attributes from "{this.props.oldTypeName}"
      //         </div>
      //       )}
      //       <br />
      //       <div>Do you want to continue?</div>
      //       <br />
      //       <div className={styles.continueButtonWrapper}>
      //         <button
      //           className={styles.continueButton}
      //           onClick={this.props.saveAttributes}
      //         >
      //           Continue
      //         </button>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    );
  }
}

export default Popup;
