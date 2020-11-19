import React, { useState } from "react";
import styles from "./InfoModal.module.css";

import "antd/dist/antd.css";

import { Modal, Card } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const InfoModal = ({
  memorial,
  Name,
  onCancelClick,
  hideModal,
  onDirectionsClick,
  type,
}) => {
  const [visible, setVisible] = useState(true);

  console.log(visible);
  return (
    <div>
      <Modal
        visible={visible}
        content="Add row details here..."
        cancelText="Cancel"
        onCancel={() => {
          setVisible(false);
        }}
      >
        <Card title={memorial.Name} size="large">
          <div className={styles.cardBody}>
            <div className={styles.attributes}>
              {memorial.Type.Attributes.map((attribute) => {
                return (
                  <div key={attribute.Id} className={styles.attribute}>
                    <div className={styles.attributeName}>
                      {attribute.Name}:
                    </div>
                    <div>{attribute.Value.Value}</div>
                  </div>
                );
              })}
            </div>
            <div className={styles.imageWrapper}>
              <img
                alt="memorial"
                className={styles.memorialImage}
                src={
                  memorial.Image
                    ? `https://${process.env.REACT_APP_AZURE_BLOB_ACCOUNT_NAME}.blob.core.windows.net/${process.env.REACT_APP_AZURE_BLOB_MEMORIAL_IMAGE_CONTAINER_NAME}/${memorial.Image}`
                    : "https://lunawood.com/wp-content/uploads/2018/02/placeholder-image.png"
                }
              />
            </div>
          </div>
        </Card>
      </Modal>
    </div>
  );
};

export default InfoModal;
