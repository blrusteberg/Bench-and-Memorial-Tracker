import React, { useState } from "react";
import { Table, Space, Form, Checkbox, Switch, Tag, Button} from "antd";
import {EyeInvisibleOutlined} from '@ant-design/icons';
import styles from "./AccountsTable.module.css";


const AccountsTable = ({
    accounts,
    onDeleteClick,
    onShowClick,
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
          render: (password) => {
              return (
                <Button icon={<EyeInvisibleOutlined/>} onClick={() => onShowClick(password)}></Button>
              )
          }
        },
        {
          title: 'Account Type',
          dataIndex: 'AccountType',
          key: 'AccountType',
          align: 'center',
          render: (type) => {
                let color = type.length > 5 ? '#ffa940' : '#d9d9d9';
                if (type === 'admin') {
                    color = '#fadb14';
                }
                return (
                    <Tag color={color} key={type}>
                        {type.toUpperCase()}
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