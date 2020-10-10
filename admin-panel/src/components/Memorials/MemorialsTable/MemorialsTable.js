import React, { useState } from "react";
import { Table, Space, Form } from "antd";

import styles from "./MemorialsTable.module.css";
import AttributesTable from "./AttributesTable/AttributesTable";
import EditableCell from "../Components/EditableCell";
import DeleteMemorialModal from "../Components/DeleteMemorialModal";

const MemorialsTable = ({ memorials, onDeleteClick }) => {
  const [editingKey, setEditingKey] = useState("");
  const [form] = Form.useForm();

  const isEditing = (record) => editingKey === record.key;

  const onSaveMemorialClick = async (memorialId) => {
    try {
      const row = await new Form.validateFields();
      const newData = [...memorials];
      const index = newData.findIndex((memorial) => memorial.Id === memorialId);
    } catch (error) {
      console.log("Validation failed: ", error);
    }
  };

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
            <a onClick={() => onSaveMemorialClick(record)}>Save</a>
            <a onClick={() => setEditingKey("")}>Cancel</a>
          </Space>
        ) : (
          <Space size="small" align="center">
            <a onClick={() => setEditingKey(record.key)}>Edit</a>
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
            editing: isEditing(memorial),
            dataIndex: col.dataIndex,
            title: col.title,
            inputType: "Words",
          }),
        }
      : col;
  });

  return (
    <Form component={false}>
      <Table
        className={styles.Memorials}
        columns={mergedColumns}
        dataSource={formatMemorialsForTable()}
        expandedRowRender={(memorial) => (
          <AttributesTable attributes={memorial.Type.Attributes} />
        )}
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
