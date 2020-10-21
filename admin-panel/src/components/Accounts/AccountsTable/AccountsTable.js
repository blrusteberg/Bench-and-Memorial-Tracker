import React, { useState } from "react";
import { Table, Space, Form, Checkbox, Switch, Tag } from "antd";

import styles from "./AccountsTable.module.css";


const AccountsTable = ({
    accounts,
    onDeleteClick,
    saveAccount,
}) => {
    const [form] = Form.useForm();

    const columns = [
        {
          title: 'Username',
          dataIndex: 'Username',
          key: 'Username',
          align: 'left'
        },
        {
          title: 'Password',
          dataIndex: 'Password',
          key: 'Password',
          align: 'center',
        },
        {
          title: 'Account Type',
          dataIndex: 'AccountType',
          key: 'AccountType',
          align: 'center',
          render: (AccountTypes) => {
                let color = AccountTypes.length > 5 ? '#873800' : '#bfbfbf';
                if (AccountTypes === 'admin') {
                    color = '#faad14';
                }
                return (
                    <Tag color={color} key={AccountTypes}>
                        {AccountTypes.toUpperCase()}
                    </Tag>
                    )
                }
            },
        {
          title: 'Delete Access',
          dataIndex: 'DelAccess',
          align: 'center',
          render: (delAccess) =>
            <Switch checked={delAccess} disabled={true} />
        },
        {
          title: "Action",
          dataIndex: "Operation",
          key: "Operation",
          align: 'center',
          render: (text, record) => (
            <Space size="middle">
              <a onClick={() => onDeleteClick(record)}>Delete</a>
            </Space>
          )
        }
      ];

      const formatForTable = () => 
        accounts.map((accounts) => {
            accounts.key = accounts.Id;
            return accounts;
        });
      

    return (
        <Form component={false} form={form}>
            <Table
                className={styles.Accounts}
                columns={columns}
                dataSource={formatForTable()}
                bordered
            />
        </Form>
    );
};

export default AccountsTable;