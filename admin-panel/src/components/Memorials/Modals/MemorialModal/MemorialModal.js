import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import axios from "axios";

const MemorialModal = ({ onCancel = () => {}, memorial, visible = false }) => {
  // null memorial assumes you are adding new memorial
  const [types, setTypes] = useState();
  const [loadingTypes, setLoadingTypes] = useState(true);

  useEffect(() => {
    if (!memorial && !loadingTypes) {
      axios.get(`${process.env.REACT_APP_API_BASE_URL}/types`).then((res) => {
        setTypes(res.data);
        setLoadingTypes(false);
      });
    }
  });

  const onCancelClick = () => {
    onCancel();
  };

  return (
    <Modal visible={visible} onCancel={onCancelClick}>
      <MemorialForm memorial={memorial} />
    </Modal>
  );
};

export default MemorialModal;
