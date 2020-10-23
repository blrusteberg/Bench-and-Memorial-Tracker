import React, { useState, useEffect } from "react";
import { Modal, Spin, Form, Card } from "antd";
import axios from "axios";

import styles from "./MemorialModal.module.css";
import NameAndAttributesTab from "./MemorialCardTabs/NameAndAttributesTab";
import ImageUploadTab from "./MemorialCardTabs/ImageUploadTab";
import ReviewTab from "./MemorialCardTabs/ReviewTab";

const MemorialModal = ({ onCancel = () => {}, memorial, visible = false }) => {
  const [types, setTypes] = useState();
  const [loadingTypes, setLoadingTypes] = useState(true);
  const [tabKey, setTabKey] = useState("nameAndAttributes");
  const [form] = Form.useForm();

  useEffect(() => {
    if (!memorial && loadingTypes) {
      axios
        .get(`${process.env.REACT_APP_API_BASE_URL}/types/attributes`)
        .then((res) => {
          const types = res.data;
          types.forEach((type) => {
            const attributes = type.Attributes;
            const sortedAttributes = [];
            for (let i = attributes.length - 1; i > -1; i--) {
              const attribute = attributes[i];
              const attributeName = attribute.Name.toLowerCase();
              attributeName === "latitude" || attributeName === "longitude"
                ? sortedAttributes.unshift(attribute)
                : sortedAttributes.push(attribute);
            }
            type.Attributes = sortedAttributes;
          });
          setTypes(types);
          setLoadingTypes(false);
        })
        .catch((err) => console.log("ERROR", err));
    }
  });

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

  const getNextTabKey = (currentTabKey) => {
    for (let i = 0; i < cardTabs.length; i++) {
      if (cardTabs[i].key === currentTabKey) {
        return i < cardTabs.length - 1 ? cardTabs[i + 1].key : "";
      }
    }
  };
  const onOkClick = () => {
    const nextTabKey = getNextTabKey(tabKey);
    if (nextTabKey) {
      setTabKey(nextTabKey);
      return;
    }
  };

  const carTabComponents = new Map([
    { nameAndAttributes: <NameAndAttributesTab types={types} /> },
    { imageUpload: <ImageUploadTab /> },
    { reviewAndCreate: <ReviewTab /> },
  ]);

  const onCancelClick = () => {
    onCancel();
  };

  return (
    <Modal
      visible={visible}
      onCancel={onCancelClick}
      onOk={onOkClick}
      width={550}
    >
      {console.log("HELLO", tabKey)}
      <div className={styles.modalBody}>
        {loadingTypes ? (
          <Spin tip="Loading memorial types..." />
        ) : (
          <Form form={form} layout="vertical">
            <Card
              size="large"
              activeTabKey={tabKey}
              tabList={cardTabs}
              onTabChange={(key) => setTabKey(key)}
              style={{ margin: "14px" }}
            >
              {console.log(carTabComponents.get(nameAndAttributes))}
            </Card>
          </Form>
        )}
      </div>
    </Modal>
  );
};

export default MemorialModal;
