import React from 'react';
import { Table, Space, Checkbox } from 'antd';
import axios from "axios";
import styles from "./Accounts.module.css";
import "antd/dist/antd.css";


class Accounts extends React.Component {
  state = {
    Accounts: [
      {
        Id: "",
        Username: "",
        Password: "",
        AccountType: "",
        DelAccess: ""
      }
    ]
  };

  columns = [
    {
      title: 'Username',
      dataIndex: 'Username',
      key: 'Username'
    },
    {
      title: 'Password',
      dataIndex: 'Password',
      key: 'Password',
      align: 'center'
    },
    {
      title: 'Account Type',
      dataIndex: 'AccountType',
      key: 'AccountType'
    },
    {
      title: 'Delete Access',
      dataIndex: 'DelAccess',
      render: (hasDelete) =>
        hasDelete ? <Checkbox checked={true} disabled={true}/>: <Checkbox checked={false} disabled={true}/>
    },
    {
      title: "Action",
      dataIndex: "Operation",
      key: "Operation",
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
      })
  }
  
  formatForTable = () => {
    return this.state.Accounts.map((account) => {
      account.key = account.Id;
      return account;
    })
  }

  render() {
    return (
      <Table className={styles.accounts} dataSource={this.formatForTable()} pagination={false} columns={this.columns} />
    )
  }
}
export default Accounts;