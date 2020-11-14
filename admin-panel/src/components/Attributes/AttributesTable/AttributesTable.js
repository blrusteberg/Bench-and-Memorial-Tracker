import React, { useState } from "react";
import { Table, Space, Form } from "antd";

import styles from "./AttributesTable.module.css";
import EditableCell from "../Components/EditableCell";

import { getDeleteAccess } from "../../../utils/utils";

const AttributesTable = ({
  attributes,
  saveAttribute,
  onDeleteClick,
  attributeNameValidator,
}) => {
  const [editingKey, setEditingKey] = useState("");
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);

  const HAS_DELETE_ACCESS = getDeleteAccess();

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
              <button
                type="button"
                className={styles.linkButton}
                onClick={() => onSaveClick(record.key)}
              >
                Save
              </button>
            )}

            <button
              type="button"
              className={styles.linkButton}
              onClick={onCancelClick}
            >
              Cancel
            </button>
          </Space>
        ) : (
          <Space size="small" align="center">
            <button
              type="button"
              className={styles.linkButton}
              onClick={() => onEditClick(record)}
            >
              Edit
            </button>
            {HAS_DELETE_ACCESS && <button
              type="button"
              className={styles.linkButton}
              onClick={() => onDeleteClick(record)}
            >
              Delete
            </button>}
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
