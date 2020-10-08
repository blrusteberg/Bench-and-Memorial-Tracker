import React, { useState } from "react";
import axios from "axios";
import "antd/dist/antd.css";

import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const DeleteMemorialModal = (props) => {
  const [showModal, setShowModal] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  return (
    <Modal
      visible={showModal}
      title={`Are you sure you want to delete ${props.memorial.Name}`}
      icon={<ExclamationCircleOutlined />}
      content="Add row details here..."
      okText="Delete"
      okType="danger"
      cancelText="Cancel"
      confirmLoading={isDeleting}
      onOk={() => {
        axios
          .delete(
            `${process.env.REACT_APP_API_BASE_URL}/memorials/${props.memorial.Id}`
          )
          .then(() => {
            setShowModal(false);
            window.location = "/memorials";
          });
        setIsDeleting(true);
      }}
      onCancel={() => {
        setShowModal(false);
      }}
    ></Modal>
  );
};

export default DeleteMemorialModal;
