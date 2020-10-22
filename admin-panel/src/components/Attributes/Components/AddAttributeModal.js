import React, { useState, createContext } from "react";
import "antd/dist/antd.css";

import { Modal, Form, Input, Select } from "antd";
import styles from "./AddAttributeModal.module.css";

const AddAttributeModal = ({
  attributes,
  addAttribute,
  modalVisible,
  onCancelClick,
}) => {
  const [form] = Form.useForm();

  const onAddClick = async () => {
    const formData = await form.validateFields();
    if (checkAttributes(formData) == true) {
      addAttribute(formData);
    } else {
      return alert(`${formData.Name} already Exists!`);
    }
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
        form.resetFields();
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
                  message: "Enter a Name.",
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
                  message: "Choose a Value Type.",
                },
              ]}
            >
              <Select placeholder="Select a Value Type" style={{ width: 200 }}>
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
