import React, { useState, createContext } from "react";
import axios from "axios";
import "antd/dist/antd.css";

import { Modal, Form, Input, Menu, Select, message, Checkbox } from "antd";
import { ExclamationCircleOutlined, DownOutlined } from "@ant-design/icons";
import styles from "./AddAccountModal.module.css";
import Attributes from "../../Types/Attributes/Attributes";

const AddAccountModal = ({
  accounts,
  addSuccess,
  modalVisible,
  onCancelClick,
}) => {
  const [account, setAccount] = useState([
    {
        Id: "",
        Username: "",
        Password: "",
        AccountType: "",
        DelAccess: ""
    },
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [form] = Form.useForm();

  const onAddClick = async () => {
    const formData = await form.validateFields();
    axios
        .post()
    console.log(formData);
  };

  const getAccountNames = () => {
    accounts.map((accounts) => {
      accounts.key = accounts.Id;
      return accounts;
    });
  };

  const onAccountsInputChange = (event) => {
    const value = event.target.value;
    //some error checking
  };

  return (
    <Modal
      title="Adding a new Account..."
      visible={modalVisible}
      okText={"Add Account"}
      onOk={onAddClick}
      onCancel={() => {
        onCancelClick();
        modalVisible = false;
      }}
    >
      <Form form={form}>
        <div className={styles.accountNameContainer}>
          <tr>
            <Form.Item label="Username" name="Username">
              <Input className={styles.accountInput} maxLength={248} />
            </Form.Item>
          </tr>
        </div>
        <div className={styles.accountNameContainer}>
          <tr>
            <Form.Item label="Password" name="Password">
              <Input className={styles.accountInput} maxLength={248} />
            </Form.Item>
          </tr>
        </div>
        <div className={styles.accountTypeContainer}>
          <tr>
            <Form.Item label="Account Type" valueType="AccountType">
              <Select placeholder="Select Account Type" style={{ width: 200 }}>
                <option value="Tagger">Tagger</option>
                <option value="Clerk">Clerk</option>
                <option value="Admin">Admin</option>
              </Select>
            </Form.Item>
          </tr>
        </div>
        <div className={styles.accountNameContainer}>
          <tr>
            <Form.Item label="Delete Access" name="DeleteAccess">
              <Checkbox className={styles.accountInput} maxLength={248} />
            </Form.Item>
          </tr>
        </div>
      </Form>
    </Modal>
  );
};

export default AddAccountModal;
