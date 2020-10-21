import React, { useState } from "react";
import { Table, Space, Form, Badge } from "antd";

import styles from "./MemorialsTable.module.css";
import AttributesTable from "./AttributesTable/AttributesTable";
import EditableCell from "../Components/EditableCell";

const MemorialsTable = ({
  memorials,
  onUpdateMemorialStatusClick,
  onDeleteClick,
  saveMemorial,
}) => {
  const [editingKey, setEditingKey] = useState("");
  const [form] = Form.useForm();
  const [attributesForm] = Form.useForm();
  const [saving, setSaving] = useState(false);

  const isEditing = (record) => editingKey === record.key;

  const onSaveClick = async (key) => {
    setSaving(true);
    try {
      const memorial = await form.validateFields();
      const attributes = await attributesForm.validateFields();
      console.log("MEMORIAL: ", memorial);
      console.log("ATTRIBUTES: ", attributes);
      // saveMemorial(
      //   row,
      //   key,
      //   () => {
      //     setEditingKey("");
      //     setSaving(false);
      //   },
      //   () => {
      //     setSaving(false);
      //   }
      // );
    } catch (error) {
      setSaving(false);
    }
  };

  const getChangeStatusAction = (record) => {
    switch (record.Status) {
      case "live":
        return (
          <a
            href={null}
            onClick={() => onUpdateMemorialStatusClick(record, "on hold")}
          >
            Put on hold
          </a>
        );
      case "unapproved":
        return (
          <a
            href={null}
            onClick={() => onUpdateMemorialStatusClick(record, "live")}
          >
            Approve
          </a>
        );
      case "on hold":
        return (
          <a
            href={null}
            onClick={() => onUpdateMemorialStatusClick(record, "live")}
          >
            Go live
          </a>
        );
      default:
        return null;
    }
  };

  const onEditClick = (record) => {
    form.setFieldsValue({
      Name: "",
      ...record,
    });
    const fieldValues = [];
    console.log("FIELD VALUES: ", { ...record.Type.Attributes });
    console.log("getFieldsValue: ", form.getFieldsValue());
    attributesForm.setFieldsValue(
      [
        {
          Value: "",
          Required: false,
        },
      ],
      ...record.Type.Attributes
    );
    setEditingKey(record.key);
  };

  const onCancelClick = () => setEditingKey("");

  const formatMemorialsForTable = () =>
    memorials.map((memorial) => {
      memorial.key = memorial.Id;
      return memorial;
    });

  const memorialStatusToBadgeColor = new Map([
    ["unapproved", "yellow"],
    ["live", "green"],
    ["on hold", "red"],
  ]);

  const memorialStatusToBadgeText = new Map([
    ["unapproved", "Unapproved"],
    ["live", "Live"],
    ["on hold", "On hold"],
  ]);

  const columns = [
    {
      title: "Name",
      dataIndex: "Name",
      key: "name",
      editable: true,
      inputType: "Words",
      textWrap: "word-break",
      width: "35%",
    },
    {
      title: "Type",
      dataIndex: ["Type", "Name"],
      key: "type",
      align: "center",
      editable: false,
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "status",
      align: "center",
      editable: false,
      render: (_, record) => {
        const memorialStatus = record.Status;
        return (
          <Badge
            color={memorialStatusToBadgeColor.get(memorialStatus)}
            text={memorialStatusToBadgeText.get(memorialStatus)}
          />
        );
      },
    },
    {
      title: "Action",
      dataIndex: "operation",
      key: "operation",
      align: "center",
      editable: false,
      render: (_, record) =>
        isEditing(record) ? (
          <Space size="small" align="center">
            {saving ? (
              <p>Saving...</p>
            ) : (
              <a href={null} onClick={() => onSaveClick(record.key)}>
                Save
              </a>
            )}

            <a href={null} onClick={onCancelClick}>
              Cancel
            </a>
          </Space>
        ) : (
          <Space size="large" align="center">
            {getChangeStatusAction(record)}
            <a href={null} onClick={() => onEditClick(record)}>
              Edit
            </a>
            <a href={null} onClick={() => onDeleteClick(record)}>
              Delete
            </a>
          </Space>
        ),
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
            inputRequired: true,
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
          <AttributesTable
            Attributes={memorial.Type.Attributes}
            editing={isEditing(memorial)}
            form={attributesForm}
          />
        )}
        bordered
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        tableLayout="fixed"
      />
    </Form>
  );
};

export default MemorialsTable;
