import React, { useState } from "react";
import axios from "axios";
import "antd/dist/antd.css";

import { Modal, Card } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import styles from "./DeleteMemorialModal.module.css";

const DeleteMemorialModal = ({ memorial, deleteSuccess, onCancelClick }) => {
  const [visible, setVisible] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const onDeleteClick = () => {
    axios
      .delete(`${process.env.REACT_APP_API_BASE_URL}/memorials/${memorial.Id}`)
      .then((res) => {
        setIsDeleting(false);
        deleteSuccess();
        setVisible(false);
      });
  };

  return (
    <Modal
      visible={visible}
      title={"Are you sure you want to delete this memorial?"}
      icon={<ExclamationCircleOutlined />}
      content="Add row details here..."
      okText="Delete"
      okType="danger"
      cancelText="Cancel"
      confirmLoading={isDeleting}
      onOk={onDeleteClick}
      onCancel={() => {
        onCancelClick();
        setVisible(false);
      }}
    >
      <Card title={memorial.Name} size="large">
        <div className={styles.cardBody}>
          <div className={styles.attributes}>
            {memorial.Type.Attributes.map((attribute) => {
              return (
                <div className={styles.attribute}>
                  <div className={styles.attributeName}>{attribute.Name}:</div>
                  <div>{attribute.Value.Value}</div>
                </div>
              );
            })}
          </div>
          <div className={styles.imageWrapper}>
            <img
              alt="memorial"
              className={styles.memorialImage}
              src={`https://${process.env.REACT_APP_AZURE_BLOB_ACCOUNT_NAME}.blob.core.windows.net/${process.env.REACT_APP_AZURE_BLOB_MEMORIAL_IMAGE_CONTAINER_NAME}/${memorial.Image}`}
            />
          </div>
        </div>
      </Card>
    </Modal>
  );
};

export default DeleteMemorialModal;
