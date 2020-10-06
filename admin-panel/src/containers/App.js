import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { CaretRightOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import "antd/dist/antd.css";

import styles from "./App.module.css";
import SideBar from "../components/SideBar/SideBar";
import Accounts from "../components/Accounts/Accounts";
import Attributes from "../components/Attributes/Attributes";
import Memorials from "../components/Memorials/Memorials";
import Types from "../components/Types/Types";
import TaggerForm from "../components/TaggerForm/TaggerForm";
import { hasRole } from "../services/auth";

import { Form, Input, Button } from 'antd';
require('dotenv').config()

class App extends React.Component {
  state = {
    page: "Memorials",
    sideBarCollapse: false,
    roles: ["User", "Admin", "Clerk", "Tagger"],
    isLoggedIn: false
  };
  handleNavigationClick = (event) => {
    this.changePage(event.key);
  };

  changePage = (newPage) => {
    if (newPage !== this.state.page) {
      this.setState({
        page: newPage,
      });
    }
  };

  handlePermissionChange = (e) => {
    let roles = [];
    if (e.target.value === "clerk") {
      roles = ["User", "Clerk"];
    } else if (e.target.value === "tagger") {
      roles = ["User", "Tagger"];
    } else if (e.target.value === "admin") {
      roles = ["User", "Admin", "Clerk", "Tagger"];
    }

    this.setState({
      roles: roles,
    });
  };

  sideBarCollapseHandler = (collapse) => {
    this.setState({
      sideBarCollapse: collapse,
    });
  };

  createFormForInitialLogin = () => {
    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    };
    const tailLayout = {
      wrapperCol: {
        offset: 8,
        span: 16,
      },
    };

    const onFinish = (values) => {
      if(values.password.toLowerCase() === process.env.REACT_APP_PASSWORD){
        localStorage.setItem('isLoggedIn', true);
        this.setState({
          isLoggedIn: true
        })
      }
    };
  
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    return (
      <div className={styles.formWrapper}>
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input password to enter application!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }

  render() {
    let isLoggedIn = localStorage.getItem('isLoggedIn');
    const { Header, Sider, Content } = Layout;
    return (
      <div className={styles.App}>
      {isLoggedIn ? (
        <Layout>
          <Layout>
            <BrowserRouter>
              {this.state.sideBarCollapse ? null : (
                <Sider className={styles.SidebarWrapper}>
                  <SideBar
                    handleNavigationClick={this.handleNavigationClick}
                    sideBarCollapseHandler={() =>
                      this.sideBarCollapseHandler(true)
                    }
                    handlePermissionChange={this.handlePermissionChange}
                    roles={this.state.roles}
                  />
                </Sider>
              )}

              <Content className={styles.dashWrapper}>
                <Header className={styles.dashHeader}>
                  {this.state.sideBarCollapse ? (
                    <CaretRightOutlined
                      className={styles.openSidePanelIcon}
                      onClick={() => this.sideBarCollapseHandler(false)}
                    />
                  ) : null}
                </Header>
                <div className={styles.dashContent}>
                  <Switch>
                    {hasRole(this.state.roles, ["Admin"]) && (
                      <Route exact path="/accounts" component={Accounts} />
                    )}
                    {hasRole(this.state.roles, ["Tagger", "Clerk"]) && (
                      <Route exact path="/tagger-form" component={TaggerForm} />
                    )}
                    {hasRole(this.state.roles, ["Clerk"]) && (
                      <Route exact path="/memorials" component={Memorials} />
                    )}
                    {hasRole(this.state.roles, ["Clerk"]) && (
                      <Route exact path="/types" component={Types} />
                    )}
                    {hasRole(this.state.roles, ["Clerk"]) && (
                      <Route exact path="/attributes" component={Attributes} />
                    )}
                  </Switch>
                </div>
              </Content>
            </BrowserRouter>
          </Layout>
        </Layout>)
        :
        this.createFormForInitialLogin()
      }
      </div> 
    );
  }
}

export default App;
