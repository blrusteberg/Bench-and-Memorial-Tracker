import React from "react";
import "antd/dist/antd.css";

import { Modal, Form, Input, Select } from "antd";
import styles from "./AddAttributeModal.module.css";

const AddAttributeModal = ({
  attributes,
  addAttribute,
  modalVisible,
  onCancelClick,
  attributeNameValidator,
}) => {
  const [form] = Form.useForm();

  const onAddClick = async () => {
    const formData = await form.validateFields();
    addAttribute(formData);
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
                  message: "Enter a name",
                },
                () => ({
                  validator(_, value) {
                    const result = attributeNameValidator(value);
                    return result.valid
                      ? Promise.resolve(result.message)
                      : Promise.reject(result.message);
                  },
                }),
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
                  message: "Choose a value type",
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
