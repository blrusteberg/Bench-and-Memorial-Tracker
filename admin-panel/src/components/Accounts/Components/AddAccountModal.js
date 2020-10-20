import React, { useState, } from "react";
import "antd/dist/antd.css";

import { Modal, Form, Input,  Select, Switch } from "antd";
import styles from "./AddAccountModal.module.css";

const { Option } = Select;

const AddAccountModal = ({
  accounts,
  addSuccess,
  saveAccount,
  modalVisible,
  onCancelClick,
}) => {
  const [account, setAccount] = useState([
    {
        Id: "",
        Username: "",
        Password: "",
        AccountType: "",
        DelAccess: "",
    },
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [form] = Form.useForm();

  const onAddClick = async () => {
    const formData = await form.validateFields();
    saveAccount(formData);
  };
  
  return (
    <Modal
      title="Create a new account"
      visible={modalVisible}
      okText={"Add Account"}
      onOk={onAddClick}
      maskClosable={false}
      onCancel={() => {
        onCancelClick();
        modalVisible = false;
      }}
    >
      <Form form={form}>
        <div className={styles.accountNameContainer}>
          <tr>
            <Form.Item 
                label="Username" 
                name="Username"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please input username!',
                    },
                ]}
            >
              <Input className={styles.accountInput} maxLength={50} />
            </Form.Item>
          </tr>
        </div>
        <div className={styles.accountNameContainer}>
          <tr>
            <Form.Item 
                label="Password" 
                name="Password"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please input password!',
                    },
                ]}
            >
              <Input.Password />
            </Form.Item>
          </tr>
        </div>
        <div className={styles.accountTypeContainer}>
          <tr>
            <Form.Item 
                label="Account Type" 
                name="AccountType"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please select an account type!',
                    },
                ]}
            >
              <Select placeholder="Select Account Type" className={styles.accountDropdown}>
                <Option value="tagger">Tagger</Option>
                <Option value="clerk">Clerk</Option>
                <Option value="admin">Admin</Option>
              </Select>
            </Form.Item>
          </tr>
        </div>
        <div className={styles.accountNameContainer}>
          <tr>
            <Form.Item label="Delete Access" name="DelAccess" valuePropName="checked">
              <Switch />
            </Form.Item>
          </tr>
        </div>
      </Form>
    </Modal>
  );
};

export default AddAccountModal;
