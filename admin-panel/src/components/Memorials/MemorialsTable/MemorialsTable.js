import React, { useState } from "react";
import { Table, Space, Form } from "antd";

import styles from "./MemorialsTable.module.css";
import AttributesTable from "./AttributesTable/AttributesTable";
import EditableCell from "../Components/EditableCell";
import DeleteMemorialModal from "../Components/DeleteMemorialModal";

const MemorialsTable = ({ memorials, onDeleteClick, saveMemorial }) => {
  const [editingKey, setEditingKey] = useState("");
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);

  const isEditing = (record) => editingKey === record.key;

  const onSaveClick = async (key) => {
    setSaving(true);
    try {
      const row = await form.validateFields();
      saveMemorial(
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

  const formatMemorialsForTable = () =>
    memorials.map((memorial) => {
      memorial.key = memorial.Id;
      return memorial;
    });

  const columns = [
    {
      title: "Name",
      dataIndex: "Name",
      editable: true,
    },
    {
      title: "Type",
      dataIndex: ["Type", "Name"],
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
          onCell: (memorial) => ({
            record: memorial,
            editing: isEditing(memorial),
            dataIndex: col.dataIndex,
            title: col.title,
            inputType: "Words",
          }),
        }
      : col;
  });

  return (
    <Form component={false} form={form}>
      <Table
        className={styles.Memorials}
        columns={mergedColumns}
        dataSource={formatMemorialsForTable()}
        expandedRowRender={(memorial) => (
          <AttributesTable attributes={memorial.Type.Attributes} />
        )}
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

export default MemorialsTable;
