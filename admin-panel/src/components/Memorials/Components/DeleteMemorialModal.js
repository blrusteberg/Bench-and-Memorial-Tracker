import React, { useState, createContext } from "react";
import axios from "axios";
import "antd/dist/antd.css";

import { Modal, Card, Space } from "antd";
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
      title={"Are you sure ?"}
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
      <Card title={memorial.Name}>
        {memorial.Type.Attributes.map((attribute) => {
          console.log("ATTRIBUTE: ", attribute);
          return (
            <div className={styles.attribute}>
              <div className={styles.attributeName}>{attribute.Name}:</div>
              <div>{attribute.Value}</div>
            </div>
          );
        })}
      </Card>
    </Modal>
  );
};

export default DeleteMemorialModal;
