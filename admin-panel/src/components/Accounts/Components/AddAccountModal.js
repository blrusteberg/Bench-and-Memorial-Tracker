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
    if(formData.DelAccess == undefined) {
        formData.DelAccess = false;
    }
    saveAccount(formData);
  };



  return (
    <Modal
      title="Create a new account"
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
              <Input.Password />
            </Form.Item>
          </tr>
        </div>
        <div className={styles.accountTypeContainer}>
          <tr>
            <Form.Item label="Account Type" name="AccountType" valueType="string">
              <Select placeholder="Select Account Type" style={{ width: 200 }}>
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
