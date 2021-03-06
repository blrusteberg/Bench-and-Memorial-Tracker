import React, { useState } from "react";
import axios from "axios";
import "antd/dist/antd.css";

import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const DeleteAttributeModal = ({ attribute, deleteSuccess, onCancelClick }) => {
  const [visible, setVisible] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const onDeleteClick = () => {
    axios
      .delete(
        `${process.env.REACT_APP_API_BASE_URL}/attributes/${attribute.Id}`
      )
      .then((res) => {
        setIsDeleting(false);
        deleteSuccess();
        setVisible(false);
      });
  };

  return (
    <Modal
      visible={visible}
      title={`Are you sure you want to delete ${attribute.Name} attribute?`}
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
      <div>
        Note: Deleting this attribute will delete {attribute.Name}'s records and
        delete it from all associated types.
      </div>
    </Modal>
  );
};

export default DeleteAttributeModal;
