import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { CaretRightOutlined } from "@ant-design/icons";
import { Layout, Checkbox } from "antd";
import "antd/dist/antd.css";
import axios from "axios";

import styles from "./App.module.css";
import SideBar from "../components/SideBar/SideBar";
import Accounts from "../components/Accounts/Accounts";
import Attributes from "../components/Attributes/Attributes";
import Memorials from "../components/Memorials/Memorials";
import Types from "../components/Types/Types";
import TaggerForm from "../components/TaggerForm/TaggerForm";
import { hasRole } from "../services/auth";

import { Form, Input, Button, message, Tag } from "antd";
require("dotenv").config();

class App extends React.Component {
  state = {
    page: "Memorials",
    sideBarCollapse: false,
    isLoggedIn: false,
    stayLoggedIn: false,
    userRoleColor: "",
    pageHeaderName: "",
  };

  componentDidMount() {
    this.handleTagColor();
    let isLoggedIn =
      localStorage.getItem("isLoggedIn") ||
      sessionStorage.getItem("isLoggedIn");
    this.setState({
      isLoggedIn: isLoggedIn,
    });
  }

  handleNavigationClick = (event) => {
    this.changePage(event.key);
  };

  changePage = (newPage) => {
    let headerName = "";
    if (newPage !== this.state.page) {
      switch (newPage) {
        case "accounts":
          headerName = "Accounts";
          break;
        case "memorials":
          headerName = "Memorials";
          break;
        case "types":
          headerName = "Types";
          break;
        case "attributes":
          headerName = "Attributes";
          break;
        case "taggerForm":
          headerName = "Tagger Form";
          break;
        default:
          headerName = "";
      }

      this.setState({
        page: newPage,
        pageHeaderName: headerName,
      });
    }
  };

  sideBarCollapseHandler = (collapse) => {
    this.setState({
      sideBarCollapse: collapse,
    });
  };

  handleLogout = () => {
    delete localStorage.isLoggedIn;
    delete localStorage.Username;
    delete localStorage.Role;
    delete localStorage.DeleteAccess;
    delete sessionStorage.isLoggedIn;
    delete sessionStorage.Username;
    delete sessionStorage.Role;
    delete sessionStorage.DeleteAccess;
    this.setState({
      isLoggedIn: false,
    });
  };

  handleTagColor = () => {
    const ROLE = localStorage.getItem("Role") || sessionStorage.getItem("Role");
    let userRoleColor = null;
    switch (ROLE) {
      case "admin":
        userRoleColor = "#d4380d";
        break;
      case "clerk":
        userRoleColor = "#d4b106";
        break;
      case "tagger":
        userRoleColor = "#389e0d";
        break;
      default:
        userRoleColor = "##8c8c8c";
        break;
    }
    this.setState({
      userRoleColor: userRoleColor,
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

    const handleRedirectOnLogin = (role) => {
      if (role === "admin" || role === "clerk") window.location = "/memorials";
      else if (role === "tagger") window.location = "/tagger-form";
    };

    const onFinish = (values) => {
      const account = { Username: values.username, Password: values.password };
      axios
        .post(`${process.env.REACT_APP_API_BASE_URL}/accounts/login`, account)
        .then((res) => {
          if (this.state.stayLoggedIn) {
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("Username", values.username);
            localStorage.setItem("Role", res.data.role);
            localStorage.setItem("DeleteAccess", res.data.deleteAccess);
            handleRedirectOnLogin(res.data.role);
          } else {
            sessionStorage.setItem("isLoggedIn", true);
            sessionStorage.setItem("Username", values.username);
            sessionStorage.setItem("Role", res.data.role);
            sessionStorage.setItem("DeleteAccess", res.data.deleteAccess);
            handleRedirectOnLogin(res.data.role);
          }
          this.setState({
            isLoggedIn: true,
          });
        })
        .catch((error) => {
          if (error.response.status === 401) {
            errorMsg();
          }
          console.log(error);
        });
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    const onChangeStayLoggedIn = () => {
      this.setState({
        stayLoggedIn: !this.state.stayLoggedIn,
      });
    };

    const errorMsg = () => {
      message.error("Username and Password combination is incorrect");
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
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input password to enter application!",
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
          <div className={styles.checkboxWrapper}>
            <Checkbox onChange={onChangeStayLoggedIn}>Stay signed In</Checkbox>
          </div>
        </Form>
      </div>
    );
  };

  render() {
    const { Header, Sider, Content } = Layout;
    const ROLE = localStorage.getItem("Role") || sessionStorage.getItem("Role");
    const USERNAME =
      localStorage.getItem("Username") || sessionStorage.getItem("Username");
    if (ROLE === null || USERNAME === null) {
      delete localStorage.clear();
      delete sessionStorage.clear();
    }
    return (
      <div className={styles.App}>
        {this.state.isLoggedIn ? (
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
                    roles={ROLE}
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

                  <div className={styles.buttonWrapper}>
                    {USERNAME} &nbsp;
                    <Tag color={this.state.userRoleColor} key={ROLE}>
                      {ROLE.toUpperCase()}
                    </Tag>
                    <Button type="primary" onClick={this.handleLogout}>
                      Logout
                    </Button>
                  </div>
                </Header>
                <div className={styles.dashContent}>
                  <Switch>
                    {hasRole(ROLE, ["admin"]) && (
                      <Route exact path="/accounts" component={Accounts} />
                    )}
                    {hasRole(ROLE, ["tagger", "clerk", "admin"]) && (
                      <Route exact path="/tagger-form" component={TaggerForm} />
                    )}
                    {hasRole(ROLE, ["clerk", "admin"]) && (
                      <Route exact path="/memorials" component={Memorials} />
                    )}
                    {hasRole(ROLE, ["clerk", "admin"]) && (
                      <Route exact path="/types" component={Types} />
                    )}
                    {hasRole(ROLE, ["clerk", "admin"]) && (
                      <Route exact path="/attributes" component={Attributes} />
                    )}
                  </Switch>
                </div>
              </Content>
            </BrowserRouter>
          </Layout>
        ) : (
          this.createFormForInitialLogin()
        )}
      </div>
    );
  }
}

export default App;
