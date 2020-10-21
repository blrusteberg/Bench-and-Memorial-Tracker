import React, { useState, useEffect } from "react";
import { Modal, Select, Spin, Space, Card, Input, Form, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";

import styles from "./MemorialModal.module.css";
import NameAndAttributesTab from "./MemorialCardTabs/NameAndAttributesTab";
import ImageUploadTab from "./MemorialCardTabs/ImageUploadTab";
import ReviewTab from "./MemorialCardTabs/ReviewTab";

const { Option } = Select;

const MemorialModal = ({ onCancel = () => {}, memorial, visible = false }) => {
  // null memorial assumes you are adding new memorial
  const [types, setTypes] = useState();
  const [loadingTypes, setLoadingTypes] = useState(true);
  const [selectedType, setSelectedType] = useState();
  const [form] = Form.useForm();
  const [tabKey, setTabKey] = useState("nameAndAttributes");

  useEffect(() => {
    if (!memorial && loadingTypes) {
      axios
        .get(`${process.env.REACT_APP_API_BASE_URL}/types/attributes`)
        .then((res) => {
          setTypes(res.data);
          setLoadingTypes(false);
        })
        .catch((err) => console.log("ERROR", err));
    }
  });

  const onCancelClick = () => {
    onCancel();
  };

  const cardTabs = [
    {
      key: "nameAndAttributes",
      tab: "Name & Attributes",
    },
    {
      key: "imageUpload",
      tab: "Image Upload",
    },
    {
      key: "reviewAndCreate",
      tab: "Review & Create",
    },
  ];

  const tabComponents = new Map([
    ["nameAndAttributes", <NameAndAttributesTab types={types} />],
    ["imageUpload", <ImageUploadTab />],
    ["reviewAndCreate", <ReviewTab />],
  ]);

  return (
    <Modal visible={visible} onCancel={onCancelClick}>
      {loadingTypes ? (
        <Spin tip="Loading memorial types..." />
      ) : (
        <Form form={form}>
          <Card
            size="large"
            tabList={cardTabs}
            onTabChange={(key) => setTabKey(key)}
          >
            {tabComponents.get(tabKey)}
          </Card>
        </Form>
      )}
    </Modal>
  );
};

export default MemorialModal;
