import React, { useState, useEffect } from "react";
import { Modal, Spin, Form, Card, Input, Divider } from "antd";
import axios from "axios";

import styles from "./MemorialModal.module.css";
import MemorialImageUpload from "./MemorialImageUpload/MemorialImageUpload";
import AttributesForm from "./AttributesForm/AttributesForm";
import TypeSelect from "../../../../common/TypeSelect/TypeSelect";

const MemorialModal = ({
  onCancel = () => {},
  visible = false,
  memorial,
  saveMemorial = () => {},
}) => {
  const [Types, setTypes] = useState();
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const [selectedType, setSelectedType] = useState();
  const [changesMade, setChangesMade] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/types/attributes`)
      .then((res) => {
        setTypes(res.data);
        setLoading(false);
      });
  }, [memorial]);

  const onOkClick = async () => {
    const data = await form.validateFields();
    setIsSaving(true);
    const action = memorial ? "put" : "post";
    const formattedData =
      action === "put"
        ? formatFormDataForPut(data)
        : formatFormDataForPost(data);
    saveMemorial({ memorial: formattedData, action: action }, () => {
      setIsSaving(false);
      resetModalForm();
    });
  };

  const formatFormDataForPut = (data) => {
    const formattedMemorial = memorial;
    for (let i = 0; i < memorial.Type.Attributes.length; i++) {
      const attribute = memorial.Type.Attributes[i];
      attribute.Value.Value = data.Type.Attributes[attribute.Value.Id];
      formattedMemorial.Type.Attributes[i] = attribute;
    }
    return formattedMemorial;
  };

  const formatFormDataForPost = (data) => {
    const formattedMemorial = {
      Name: data.Name,
      TypeId: data.Type.Id,
      Image: data.Image,
      Attributes: [],
    };
    Object.keys(data.Type.Attributes).forEach((key) => {
      formattedMemorial.Attributes.push({
        Value: data.Type.Attributes[key],
        Id: key,
      });
    });
    return formattedMemorial;
  };

  const onCancelClick = () => {
    resetModalForm();
    onCancel();
  };

  const resetModalForm = () => {
    form.resetFields();
    setSelectedType(null);
    setChangesMade(false);
    setSelectedImage(null);
    setIsSaving(false);
  };

  const onTypeSelect = (typeId) => {
    for (let i = 0; i < Types.length; i++)
      if (Types[i].Id === typeId) {
        form.setFieldsValue({
          Type: {
            Id: typeId,
          },
        });
        setSelectedType(Types[i]);
      }
  };

  const getInitialValues = () => {
    if (memorial) {
      const initialValues = {
        ["Name"]: memorial.Name,
        ["Image"]: memorial.Image,
        ["Type"]: {
          ["Id"]: memorial.Type.Id,
          ["Attributes"]: {},
        },
      };
      memorial.Type.Attributes.forEach((attribute) => {
        initialValues["Type"]["Attributes"][attribute.Value.Id] =
          attribute.Value.Value;
      });
      return initialValues;
    }
    return null;
  };

  const onImageSelect = (image) => {
    setSelectedImage(image);
    setChangesMade(true);
  };

  return (
    <Modal
      visible={visible}
      onCancel={onCancelClick}
      onOk={onOkClick}
      maskClosable={false}
      okButtonProps={{
        disabled: (memorial && !changesMade) || isSaving,
      }}
      destroyOnClose={true}
      width={550}
    >
      <div className={styles.modalBody}>
        {loading ? (
          <Spin tip="Loading memorial types..." />
        ) : (
          <Card size="large" style={{ margin: "14px", width: "100%" }}>
            <Spin spinning={isSaving}>
              <Form
                autoComplete="off"
                form={form}
                layout="vertical"
                className={styles.memorialForm}
                onValuesChange={() => setChangesMade(true)}
                initialValues={getInitialValues()}
              >
                <Form.Item
                  style={{ fontWeight: "bold" }}
                  label="Memorial Name"
                  name="Name"
                  rules={[{ required: true, message: "Enter a memorial name" }]}
                >
                  <Input maxLength={50} />
                </Form.Item>

                <Form.Item
                  name={["Type", "Id"]}
                  label="Type"
                  style={{ fontWeight: "bold" }}
                  rules={[{ required: true, message: "Select a type" }]}
                >
                  <TypeSelect
                    Types={Types}
                    onTypeSelect={onTypeSelect}
                    disabled={memorial}
                  />
                </Form.Item>

                {selectedType || memorial ? (
                  <>
                    <Divider dashed />
                    <AttributesForm
                      Attributes={
                        (memorial && memorial.Type.Attributes) ||
                        selectedType.Attributes
                      }
                    />
                  </>
                ) : null}
                <Divider dashed />
                <Form.Item name="Image" label="Image">
                  <MemorialImageUpload
                    onFileSelect={onImageSelect}
                    blobName={memorial && memorial.Image}
                    onRemove={() => setSelectedImage(null)}
                  />
                </Form.Item>
              </Form>
            </Spin>
          </Card>
        )}
      </div>
    </Modal>
  );
};

export default MemorialModal;
