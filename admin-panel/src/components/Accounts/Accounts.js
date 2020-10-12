import React from 'react';
import { Table, Space, Checkbox } from 'antd';
import axios from "axios";
import accounts from "../../data/mockAccounts.json"
import styles from "./Accounts.module.css";
import "antd/dist/antd.css";

const { Column, ColumnGroup } = Table;

class Accounts extends React.Component {
  state = {
    Accounts: [
      {
        Id: "",
        username: "",
        password: "",
        accountType: "",
        delAccess: ""
      }
    ]
  };

  columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: 'Password',
      dataIndex: 'password',
      key: 'password',
      align: 'center'
    },
    {
      title: 'Account Type',
      dataIndex: 'accountType',
      key: 'accountType'
    },
    {
      title: 'Delete Access',
      dataIndex: 'delAccess',
      render: (hasDelete) =>
        hasDelete ? <Checkbox checked={true} disabled={true}/>: <Checkbox checked={false} disabled={true}/>
    },
    {
      title: "Action",
      dataIndex: "operation",
      key: "operation",
      render: (text, record) => (
        <Space size="middle">
          <a>Edit</a>
          <a>Delete</a>
        </Space>
      )
    }
  ];
  
  
  componentDidMount() {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/accounts`
      )
      .then((res) => {
        this.setState({ Accounts: res.data });
        console.log("STATE: ", this.state);
      })
  }
  
  formatForTable = () => {
    return this.state.Accounts.map((Accounts) => {
      Accounts.key = Accounts.Id;
      return accounts;
    })
  }

  render() {
    return (
      <Table className={styles.accounts} dataSource={this.state.Accounts} pagination={false} columns={this.columns} />
    )
  }
}
export default Accounts;