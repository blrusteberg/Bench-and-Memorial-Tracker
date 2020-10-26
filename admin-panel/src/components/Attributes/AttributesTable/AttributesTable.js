import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Space, Form, Button, Modal } from "antd";

import styles from "./AttributesTable.module.css";
import EditableCell from "../Components/EditableCell";

const AttributesTable = ({
  attributes,
  saveAttribute,
  onDeleteClick,
  attributeNameValidator,
}) => {
  const [editingKey, setEditingKey] = useState("");
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);

  const isEditing = (record) => editingKey === record.key;

  const onSaveClick = async (key) => {
    setSaving(true);
    try {
      const row = await form.validateFields();
      saveAttribute(
        row,
        key,
        () => {
          setEditingKey("");
          setSaving(false);
        },
        () => {
          setSaving(false);
        }
      );
    } catch (error) {
      setSaving(false);
    }
  };

  const onEditClick = (record) => {
    form.setFieldsValue({
      Name: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const onCancelClick = () => setEditingKey("");

  const formatAttributesForTable = () =>
    attributes.map((attributes) => {
      attributes.key = attributes.Id;
      return attributes;
    });

  const columns = [
    {
      title: "Name",
      dataIndex: "Name",
      editable: true,
      customValidator: attributeNameValidator,
    },
    {
      title: "Value Type",
      dataIndex: ["ValueType"],
      align: "center",
      editable: false,
    },
    {
      title: "Action",
      dataIndex: "operation",
      align: "center",
      editable: false,
      render: (_, record) => {
        return isEditing(record) ? (
          <Space size="small" align="center">
            {saving ? (
              <p>Saving...</p>
            ) : (
              <a onClick={() => onSaveClick(record.key)}>Save</a>
            )}

            <a onClick={onCancelClick}>Cancel</a>
          </Space>
        ) : (
          <Space size="small" align="center">
            <a onClick={() => onEditClick(record)}>Edit</a>
            <a onClick={() => onDeleteClick(record)}>Delete</a>
          </Space>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    return col.editable
      ? {
          ...col,
          onCell: (attribute) => ({
            record: attribute,
            editing: isEditing(attribute),
            dataIndex: col.dataIndex,
            customValidator: col.customValidator,
            title: col.title,
            inputType: "Words",
          }),
        }
      : col;
  });

  return (
    <Form component={false} form={form}>
      <Table
        className={styles.Attributes}
        columns={mergedColumns}
        dataSource={formatAttributesForTable()}
        bordered
        components={{
          body: {
            cell: EditableCell,
          },
        }}
      />
    </Form>
  );
};

export default AttributesTable;
