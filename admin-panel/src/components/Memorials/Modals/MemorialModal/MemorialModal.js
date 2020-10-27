import React, { useState, useEffect } from "react";
import {
  Modal,
  Spin,
  Form,
  Card,
  Input,
  Divider,
  Select,
  DatePicker,
  InputNumber,
} from "antd";
import axios from "axios";

import styles from "./MemorialModal.module.css";

const { Option } = Select;

const MemorialModal = ({
  onCancel = () => {},
  visible = false,
  memorial = null,
  saveMemorial,
}) => {
  const [types, setTypes] = useState();
  const [loadingTypes, setLoadingTypes] = useState(true);
  const [form] = Form.useForm();
  const [selectedType, setSelectedType] = useState();
  const [changesMade, setChangesMade] = useState(false);
  const [action, setAction] = useState();
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (loadingTypes) {
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
          setAction("create");
          setLoadingTypes(false);
        });
    }
    if (memorial) {
      for (let i = 0; i < types.length; i++) {
        if (types[i].Id === memorial.Type.Id) {
          setSelectedType(types[i]);
          break;
        }
      }
      form.setFields([
        { name: "Name", value: memorial.Name },
        { name: "TypeId", value: memorial.Type.Id },
        ...memorial.Type.Attributes.map((attribute) => ({
          name: attribute.Id,
          value: attribute.Value,
        })),
      ]);
    }
  }, [memorial]);

  const onTypeSelect = (typeId) => {
    for (let i = 0; i < types.length; i++) {
      const type = types[i];
      if (type.Id === typeId) {
        setSelectedType(type);
        return;
      }
    }
  };

  const resetModal = () => {
    setSelectedType(null);
    setChangesMade(false);
    setAction(null);
    form.resetFields();
  };

  const onOkClick = async () => {
    const data = await form.validateFields();
    if (action === "edit") {
      memorial.Name = data.Name;
      memorial.Type.Attributes.forEach((attribute) => {
        attribute.Value = data[attribute.Id];
      });
    } else {
      memorial = {
        Name: data.Name,
        TypeId: data.TypeId,
        Attributes: selectedType.Attributes.map((attribute) => ({
          ...attribute,
          Value: data[attribute.Id],
        })),
      };
    }
    saveMemorial(memorial, resetModal);
  };

  const onCancelClick = () => {
    setIsSaving(true);
    onCancel();
  };

  const getAttributeFormInput = (attribute) => {
    let rules = [];
    let inputNode = null;
    let type = null;
    switch (attribute.ValueType) {
      case "Words":
        rules.push({ max: 248, type: "string" });
        inputNode = <Input />;
        type = "string";

      default:
        break;

      case "Number":
        inputNode = <InputNumber style={{ width: "100%" }} />;
        type = "number";
        break;

      case "Date":
        inputNode = <DatePicker format={"MM/DD/YYYY"} />;
        break;

      case "Yes/No":
        inputNode = (
          <Select>
            <Option key={"yes"} value={true}>
              Yes
            </Option>
            <Option key={"no"} value={false}>
              No
            </Option>
          </Select>
        );
        type = "boolean";
        break;
    }
    return (
      <Form.Item
        key={attribute.Id}
        type={type}
        rules={rules}
        label={attribute.Name}
        name={attribute.Id}
        initialValue={attribute.Value}
      >
        {inputNode}
      </Form.Item>
    );
  };

  return (
    <Modal
      visible={visible}
      onCancel={onCancelClick}
      onOk={onOkClick}
      okButtonProps={{
        disabled: action === ("edit" && !changesMade) || isSaving,
      }}
      okText={action === "edit" ? "Save" : "Create"}
      destroyOnClose={true}
      width={550}
    >
      <div className={styles.modalBody}>
        {loadingTypes ? (
          <Spin tip="Loading memorial types..." />
        ) : (
          <Card size="large" style={{ margin: "14px", width: "100%" }}>
            <Form
              autoComplete="off"
              form={form}
              layout="vertical"
              className={styles.newMemorialForm}
              onValuesChange={() => setChangesMade(true)}
            >
              <Form.Item
                style={{ fontWeight: "bold" }}
                label="Memorial Name"
                name="Name"
                key="Name"
                rules={[{ required: true, message: "Enter a memorial name" }]}
              >
                <Input />
              </Form.Item>
              <Divider />
              <Form.Item
                name="TypeId"
                key="Type"
                label="Type"
                style={{ fontWeight: "bold" }}
                rules={[{ required: true, message: "Select a type" }]}
              >
                <Select
                  disabled={action === "edit"}
                  style={{ fontWeight: "normal" }}
                  showSearch
                  placeholder="Select a type"
                  onChange={onTypeSelect}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {types.map((type) => (
                    <Option value={type.Id} key={type.Id}>
                      {type.Name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Divider dashed />
              {selectedType &&
                selectedType.Attributes.map((attribute) =>
                  getAttributeFormInput(attribute)
                )}
            </Form>
          </Card>
        )}
      </div>
    </Modal>
  );
};

export default MemorialModal;
