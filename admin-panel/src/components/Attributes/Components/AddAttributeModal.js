import React, { useState, createContext } from "react";
import axios from "axios";
import "antd/dist/antd.css";

import { Modal, Form, Input, Menu, Select, message } from "antd";
import { ExclamationCircleOutlined, DownOutlined } from "@ant-design/icons";
import styles from "./AddAttributeModal.module.css";
import Attributes from "../../Types/Attributes/Attributes";

const AddAttributeModal = ({
  attributes,
  addSuccess,
  saveAttribute,
  modalVisible,
  onCancelClick,
}) => {
  const [attribute, setAttribute] = useState([
    {
      Name: "",
      ValueType: "",
    },
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [form] = Form.useForm();

  const onAddClick = async () => {
    const formData = await form.validateFields();
    if (checkAttributes(formData) == true) {
      saveAttribute(formData);
    } else {
      return alert(`${formData.Name} already Exists!`);
    }
  };

  const getAttributeNames = () => {
    attributes.map((attributes) => {
      attributes.key = attributes.Id;
      return attributes;
    });
  };

  const checkAttributes = (formData) => {
    let canSave = true;
    attributes.map((attribute) => {
      if (attribute.Name.toLowerCase() === formData.Name.toLowerCase()) {
        canSave = false;
      }
    });
    if (canSave == false) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <Modal
      title="Adding a new Attribute..."
      visible={modalVisible}
      okText={"Add Attribute"}
      onOk={onAddClick}
      onCancel={() => {
        onCancelClick();
        modalVisible = false;
      }}
    >
      <Form form={form}>
        <div className={styles.attributeNameContainer}>
          <tr>
            <Form.Item
              label="Name"
              name="Name"
              rules={[
                {
                  required: true,
                  message: "Please enter a New Attribute Name!",
                },
              ]}
            >
              <Input className={styles.attributeInput} maxLength={248} />
            </Form.Item>
          </tr>
        </div>
        <div className={styles.valueTypeContainer}>
          <tr>
            <Form.Item
              label="Value Type"
              name="ValueType"
              rules={[
                {
                  required: true,
                  message: "Please select a Value Type!",
                },
              ]}
            >
              <Select placeholder="Select Value Type" style={{ width: 200 }}>
                <option value="Number">Number</option>
                <option value="Words">Words</option>
                <option value="Yes/No">Yes/No</option>
                <option value="Date">Date</option>
              </Select>
            </Form.Item>
          </tr>
        </div>
      </Form>
    </Modal>
  );
};

export default AddAttributeModal;
