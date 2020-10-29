import React, { useState } from "react";
import { Table, Space, Form, Switch, Tag, Button} from "antd";
import {DeleteOutlined, EyeInvisibleOutlined} from '@ant-design/icons';
import styles from "./AccountsTable.module.css";


const AccountsTable = ({
    accounts,
    onDeleteClick,
}) => {
    const [form] = Form.useForm();
    const [passVisible, setPassVisible] = useState(true);

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
                <>
                    <Space hidden={passVisible}>{password}</Space>
                    <Button icon={<EyeInvisibleOutlined/>} onClick={() => setPassVisible(!passVisible)}></Button>
                </>
              )
          }
        },
        {
          title: 'Account Type',
          dataIndex: 'AccountType',
          key: 'AccountType',
          align: 'center',
          render: (type) => {
            let color = null;
                switch(type) {
                    case 'admin':
                        color = '#d4380d';
                        break;
                    case 'clerk':
                        color = '#8c8c8c';
                        break;
                    default:
                        color = '#5b8c00'
                        break;

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
                <a className={styles.deleteButton} onClick={() => onDeleteClick(record)} > Delete</a> 
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