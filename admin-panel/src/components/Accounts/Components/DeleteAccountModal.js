import React, { useState, createContext } from "react";
import axios from "axios";
import "antd/dist/antd.css";

import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const DeleteAccountModal = ({ account, deleteSuccess, onCancelClick }) => {
  const [visible, setVisible] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const onDeleteClick = () => {
    axios
      .delete(
        `${process.env.REACT_APP_API_BASE_URL}/accounts/${account.Id}`
      )
      .then((res) => {
        setIsDeleting(false);
        deleteSuccess();
      });
  };

  return (
    <Modal
      visible={visible}
      title={`Are you sure you want to delete ${account.Username} account?`}
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
    </Modal>
  );
};

export default DeleteAccountModal;
