import React from "react";
import { Table } from "antd";

import styles from "./AttributesTable.module.css";

const AttributesTable = (props) => {
  const attributes = props.attributes.map((attribute) => {
    attribute.key = attribute.Id;
    return attribute;
  });

  const columns = [
    { title: "Name", dataIndex: "Name" },
    { title: "Value Type", dataIndex: "ValueType", align: "center" },
    { title: "Value", dataIndex: "Value", align: "center" },
    {
      title: "Required",
      dataIndex: "Required",
      render: (required) =>
        required ? <div className={styles.Required}>*</div> : null,
      align: "center",
    },
    {
      title: "Action",
      dataIndex: "operation",
      key: "operation",
      render: (value, row, index) => <a href="javascript:void(0)">Edit</a>,
      align: "center",
    },
  ];

  return (
    <Table
      className={styles.Attributes}
      columns={columns}
      dataSource={attributes}
    />
  );
};

export default AttributesTable;
