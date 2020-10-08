import React, { useState } from "react";
import axios from "axios";
import { Table, Space, Form, Input, Popconfirm } from "antd";

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

  EditableMemorialCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    console.log(
      "editing: ",
      editing,
      "dataIndex",
      dataIndex,
      "title: ",
      title,
      "inputType: ",
      inputType,
      "record",
      record,
      "index",
      index,
      "children",
      children,
      "restProps",
      restProps
    );
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            <Input />
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  columns = [
    {
      title: "Name",
      dataIndex: "Name",
      editable: true,
    },
    {
      title: "ValueType",
      dataIndex: "ValueType",
      align: "center",
      editable: false,
    },
    {
      title: "Action",
      dataIndex: "operation",
      render: (value, row, index) => {
        return <Space size="small" align="center">
          <a onClick={this.onEditAttributeClick}>Edit</a>
          <a onClick={() => this.onDeleteAttributeClick(row.Id)}>Delete</a>
        </Space>
      },
      
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
    console.log("Editing Attribute: ", attribute.Name);
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
