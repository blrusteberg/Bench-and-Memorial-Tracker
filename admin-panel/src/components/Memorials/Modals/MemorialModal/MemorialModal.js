import React, { useState, useEffect } from "react";
import { Modal, Spin, Form, Card, Input, Divider } from "antd";

import styles from "./MemorialModal.module.css";
import API from "../../../../services/API/API";
import MemorialImageUpload from "./MemorialImageUpload/MemorialImageUpload";
import AttributesForm from "./AttributesForm/AttributesForm";
import TypeSelect from "../../../../common/TypeSelect/TypeSelect";

const MemorialModal = ({
  onCancel = () => {},
  visible = false,
  memorial = null,
}) => {
  const [Types, setTypes] = useState();
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const [selectedType, setSelectedType] = useState();
  const [changesMade, setChangesMade] = useState(false);

  useEffect(() => {
    new API().Types.getAllAndAttributes().then((res) => {
      setTypes(res.data);
      setLoading(false);
    });
  }, [memorial, Types]);

  const onOkClick = async () => {};

  const onCancelClick = () => {
    onCancel();
  };

  const onTypeSelect = (typeId) => {
    for (let i = 0; i < Types.length; i++)
      if (Types[i].Id === typeId) setSelectedType(Types[i]);
  };

  const getInitialValues = () =>
    memorial
      ? {
          ["memorialName"]: memorial.Name,
          ["memorialImage"]: memorial.Image,
          ["typeId"]: memorial.Type.Id,
        }
      : null;

  return (
    <Modal
      visible={visible}
      onCancel={onCancelClick}
      onOk={onOkClick}
      maskClosable={false}
      /*
      okButtonProps={{
        disabled: (action === "edit" && !changesMade) || isSaving,
      }}*/
      destroyOnClose={true}
      width={550}
    >
      <div className={styles.modalBody}>
        {loading ? (
          <Spin tip="Loading memorial types..." />
        ) : (
          <Card size="large" style={{ margin: "14px", width: "100%" }}>
            <Form
              autoComplete="off"
              form={form}
              init
              layout="vertical"
              className={styles.memorialForm}
              onValuesChange={() => setChangesMade(true)}
              initialValues={getInitialValues()}
            >
              <Form.Item
                style={{ fontWeight: "bold" }}
                label="Memorial Name"
                name="memorialName"
                rules={[{ required: true, message: "Enter a memorial name" }]}
              >
                <Input maxLength={50} />
              </Form.Item>
              <Divider />
              <Form.Item
                name="typeId"
                label="Type"
                style={{ fontWeight: "bold" }}
                rules={[{ required: true, message: "Select a type" }]}
              >
                <TypeSelect
                  Types={Types}
                  onTypeSelect={onTypeSelect}
                  disabled={memorial !== null}
                />
              </Form.Item>

              {selectedType ? (
                <>
                  <Divider dashed />
                  <AttributesForm Attributes={selectedType.Attributes} />
                </>
              ) : null}

              <Divider dashed />
              <Form.Item
                name="memorialImage"
                label="Image"
                style={{ fontWeight: "bold" }}
              >
                <MemorialImageUpload />
              </Form.Item>
            </Form>
          </Card>
        )}
      </div>
    </Modal>
  );
};

export default MemorialModal;
