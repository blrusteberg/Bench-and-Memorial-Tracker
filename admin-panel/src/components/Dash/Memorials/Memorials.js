import React from "react";
import axios from "axios";
import { Table, Space, Form, Input } from "antd";

import styles from "./Memorials.module.css";

class Memorials extends React.Component {
  state = {
    Memorials: [
      {
        Id: "",
        Name: "",
        Type: {
          Id: "",
          Name: "",
          Attributes: [
            { Id: "", Name: "", ValueType: "", Required: false, Value: null },
          ],
        },
      },
    ],
    editingKey: null,
  };

  columns = [
    {
      title: "Name",
      dataIndex: "Name",
    },
    {
      title: "Type",
      dataIndex: ["Type", "Name"],
      align: "center",
    },
    {
      title: "Action",
      dataIndex: "operation",
      render: (value, row, index) => (
        <Space size="small" align="center">
          <a onClick={this.onEditMemorialClick}>Edit</a>
          <a onClick={() => this.onDeleteMemorialClick(row.Id)}>Delete</a>
        </Space>
      ),
      align: "center",
    },
  ];

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

  componentDidMount() {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/memorials/types/attributes/values`
      )
      .then((res) => {
        this.setState({ Memorials: res.data });
        console.log("STATE: ", this.state);
      });
  }

  onDeleteMemorialClick = (id) => {
    this.deleteMemorial(id);
  };

  deleteMemorial = (id) => {
    console.log("Delete Memorial: ", id);
  };

  onEditMemorialClick = (memorial) => {
    this.editMemorial(memorial);
  };


  editMemorial = (memorial) => {
    console.log("Editing Memorial: ", memorial);
  };

  onDeleteAttributeClick = (id) => {
    this.deleteAttribute(id);
  };

  deleteAttribute = (id) => {
    console.log("Delete Attribute: ", id);
  };

  onEditAttributeClick = (attribute) => {
    this.editAttribute(attribute);
  };

  editAttribute = (attribute) => {
    console.log("Editing Attribute: ", attribute);
  };

  formatMemorialsForTable = () => {
    return this.state.Memorials.map((memorial) => {
      memorial.key = memorial.Id;
      return memorial;
    });
  };

  getAttributesTable = (row) => {
    let attributes = [];
    for (let i = 0; i < this.state.Memorials.length; i++) {
      if (this.state.Memorials[i].Id === row.Id) {
        attributes = this.state.Memorials[i].Type.Attributes;
        attributes = attributes.map((attribute) => {
          attribute.key = attribute.Id;
          return attribute;
        });
        break;
      }
    }
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
        render: (value, row, index) => {
          return (
            <Space size="small" align="center">
              <a onClick={() => this.onEditAttributeClick()}>Edit</a>
              <a onClick={() => this.onDeleteAttributeClick(row.Id)}>Delete</a>
            </Space>
          );
        },
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

  render() {
    return (
      <Table
        className={styles.Memorials}
        columns={this.columns}
        dataSource={this.formatMemorialsForTable()}
        expandedRowRender={this.getAttributesTable}
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

export default Memorials;
