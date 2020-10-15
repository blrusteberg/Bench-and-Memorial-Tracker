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
    console.log(formData);
  };

  const getAttributeNames = () => {
    attributes.map((attributes) => {
      attributes.key = attributes.Id;
      return attributes;
    });
  };

  const onAttributeInputChange = (event) => {
    const value = event.target.value;
    //some error checking
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
            <Form.Item label="Name" name="Name">
              <Input className={styles.attributeInput} maxLength={248} />
            </Form.Item>
          </tr>
        </div>
        <div className={styles.valueTypeContainer}>
          <tr>
            <Form.Item label="Value Type" valueType="ValueType">
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
