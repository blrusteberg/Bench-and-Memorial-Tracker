import React from "react";
import { Table, Switch } from "antd";

import styles from "./AttributesTable.module.css";

const AttributesTable = ({ Attributes }) => {
  const formatAttributesForTable = () =>
    Attributes.map((attribute) => {
      attribute.key = attribute.Id;
      return attribute;
    });

  const columns = [
    { title: "Name", dataIndex: "Name", key: "name" },
    {
      title: "Value Type",
      dataIndex: "ValueType",
      key: "valueType",
      align: "center",
    },
    {
      title: "Value",
      dataIndex: "Value",
      key: "value",
      align: "center",
      render: (value) => {
        return typeof value !== "boolean" ? value : value ? "Yes" : "No";
      },
    },
    {
      title: "Required",
      dataIndex: "Required",
      key: "required",
      align: "center",
      inputType: "boolean",
      render: (required) => {
        return <Switch checked={required} disabled size="small" />;
      },
    },
  ];

  return (
    <Table
      className={styles.Attributes}
      columns={columns}
      dataSource={formatAttributesForTable()}
      bordered
    />
  );
};

export default AttributesTable;
