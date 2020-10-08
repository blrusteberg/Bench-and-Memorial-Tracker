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
      title: 'Id',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Email',
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
    }

  ];
  
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
  
  formatForTable = () => {
    return this.state.Accounts.map((accounts) => {
      accounts.key = accounts.Id;
      return accounts;
    })
  }

  render() {
    return (
      <Table className={styles.accounts} dataSource={accounts} pagination={false}>
        <ColumnGroup title="Account Info">
          <Column title="Id" dataIndex="id" key="id" />
          <Column title="Email" dataIndex="email" key="email" />
          <Column title="Password" dataIndex="password" key="password" />
        </ColumnGroup>
        <Column title="Role" dataIndex="accountType" key="accountType" />
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