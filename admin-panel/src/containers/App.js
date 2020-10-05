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

class App extends React.Component {
  state = {
    page: "Memorials",
    sideBarCollapse: false,
    roles: ["User", "Admin", "Clerk", "Tagger"],
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

  render() {
    const { Header, Sider, Content } = Layout;
    let roles = this.state.roles;
    return (
      <div className={styles.App}>
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
                    roles={roles}
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
                    {hasRole(roles, ["Admin"]) && (
                      <Route exact path="/accounts" component={Accounts} />
                    )}
                    {hasRole(roles, ["Tagger", "Clerk"]) && (
                      <Route exact path="/tagger-form" component={TaggerForm} />
                    )}
                    {hasRole(roles, ["Clerk"]) && (
                      <Route exact path="/memorials" component={Memorials} />
                    )}
                    {hasRole(roles, ["Clerk"]) && (
                      <Route exact path="/types" component={Types} />
                    )}
                    {hasRole(roles, ["Clerk"]) && (
                      <Route exact path="/attributes" component={Attributes} />
                    )}
                  </Switch>
                </div>
              </Content>
            </BrowserRouter>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default App;
