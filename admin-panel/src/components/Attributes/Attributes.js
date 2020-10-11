import React from "react";
import axios from "axios";
import { Table, Space, Form, Input } from "antd";

import styles from "./Attributes.module.css";

class Attributes extends React.Component {
  state = {
    Attributes: [
      {
        Id: "",
        Name: "",
        ValueType: "",
      },
    ],
  };

  columns = [
    {
      title: "Name",
      dataIndex: "Name",
    },
    {
      title: "ValueType",
      dataIndex: "ValueType",
      align: "center",
    },
    {
      title: "Action",
      dataIndex: "operation",
      render: (value, row, index) => (
        <Space size="small" align="center">
          <a onClick={this.onEditAttributeClick}>Edit</a>
          <a onClick={() => this.onDeleteAttributeClick(row.Id)}>Delete</a>
        </Space>
      ),
      align: "center",
    },
  ];

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/attributes`)
      .then((res) => {
        this.setState({ Attributes: res.data });
        console.log("STATE: ", this.state);
      });
  }

  onDeleteAttributeClick = (id) => {
    this.deleteAttribute(id);
  };

  deleteAttribute = (id) => {
    console.log("Delete Memorial: ", id);
  };

  onEditAttributeClick = (attribute) => {
    this.editAttribute(attribute);
  };

  editAttribute = (attribute) => {
    console.log("Editing Attribute: ", attribute);
  };

  formatAttributesForTable = () => {
    return this.state.Attributes.map((attributes) => {
      attributes.key = attributes.Id;
      return attributes;
    });
  };

  render() {
    return (
      <Table
        className={styles.Memorials}
        columns={this.columns}
        dataSource={this.formatAttributesForTable()}
        pagination={false}
        scroll={{ pagination: false }}
        components={{
          body: {
            cell: this.EditableMemorialCell,
          },
        }}
      />
    );
  }
}

export default Attributes;
