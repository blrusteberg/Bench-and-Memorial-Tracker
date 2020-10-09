import React from 'react';
import { Table, Space } from 'antd';
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
        email: "",
        password: "",
        accountType: ""
      }
    ]
  };

  columns = [
    {
      title: 'Username',
      dataIndex: 'email',
      key: 'email'
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
      key: 'delAccess'
    }

  ];
  
  /*
  componentDidMount() {
    axios
      .get(
        `localhost:1337/accounts`
      )
      .then((res) => {
        this.setState({ Accounts: res.data });
        console.log("STATE: ", this.state);
      })
  }
  */
  formatForTable = () => {
    return this.state.Accounts.map((accounts) => {
      accounts.key = accounts.Id;
      return accounts;
    })
  }

  render() {
    return (
      <Table className={styles.accounts} dataSource={accounts} pagination={false}>
        <Column title="Username" dataIndex="email" key="email" />
        <Column title="Password" dataIndex="password" key="password" />
        <Column title="Role" dataIndex="accountType" key="accountType" />
        <Column title="Delete Access" dataIndex="delAccess" key="delAccess" />
        <Column
          title="Actions"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <a>Delete</a>
              <a>Edit</a>
            </Space>
          )}
        />
      </Table>
    )
  }
}
export default Accounts;