import React from "react";
import { Form, Table, Switch } from "antd";

import styles from "./AttributesTable.module.css";
import EditableCell from "../../Components/EditableCell";

const AttributesTable = ({ Attributes, editing, form }) => {
  const formatAttributesForTable = () =>
    Attributes.map((attribute) => {
      attribute.key = attribute.Id;
      return attribute;
    });

  const columns = [
    { title: "Name", dataIndex: "Name", key: "name", editable: false },
    {
      title: "Value Type",
      dataIndex: "ValueType",
      key: "valueType",
      align: "center",
      editable: false,
    },
    {
      title: "Value",
      dataIndex: "Value",
      key: "value",
      align: "center",
      editable: true,
    },
    {
      title: "Required",
      dataIndex: "Required",
      key: "required",
      align: "center",
      inputType: "boolean",
      editable: true,
      render: (required) => {
        return <Switch checked={required} disabled size="small" />;
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    return col.editable
      ? {
          ...col,
          onCell: (attribute, a, b) => {
            return {
              editing: editing,
              record: attribute,
              dataIndex: col.dataIndex,
              title: col.title,
              inputRequired: attribute.Required,
              inputType: col.inputType ? col.inputType : attribute.ValueType,
            };
          },
        }
      : col;
  });

  return (
    <Table
      className={styles.Attributes}
      columns={mergedColumns}
      dataSource={formatAttributesForTable()}
      components={{
        body: {
          cell: EditableCell,
        },
      }}
      bordered
    />
  );
};

export default AttributesTable;
