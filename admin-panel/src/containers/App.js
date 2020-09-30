import React from "react";
import { Router, Switch, Route, BrowserRouter } from "react-router-dom";
import { CaretRightOutlined } from "@ant-design/icons";

import styles from "./App.module.css";
import SideBar from "../components/SideBar/SideBar";
import Accounts from "../components/Dash/Accounts/Accounts";
import Memorials from "../components/Dash/Memorials/Memorials";
import MemorialTypes from "../components/Dash/MemorialTypes/MemorialTypes";
import TaggerForm from "../components/Dash/TaggerForm/TaggerForm";
import { hasRole } from "../services/auth";

class App extends React.Component {
  state = {
    page: "Memorials",
    sideBarCollapse: false,
    roles: ["User", "Admin", "Clerk", "Tagger"],
  };
  handleNavigationClick = (e) => {
    const page = e.target.id;
    if (page) {
      this.changePage(page);
    }
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
    let roles = this.state.roles;
    return (
      <div className={styles.App}>
        <BrowserRouter>
          {this.state.sideBarCollapse ? null : (
            <div className={styles.SidebarWrapper}>
              <SideBar
                handleNavigationClick={this.handleNavigationClick}
                sideBarCollapseHandler={() => this.sideBarCollapseHandler(true)}
                handlePermissionChange={this.handlePermissionChange}
                roles={roles}
              />
            </div>
          )}

          <div className={styles.DashWrapper}>
            {this.state.sideBarCollapse ? (
              <CaretRightOutlined
                className={styles.openSidePanelIcon}
                onClick={() => this.sideBarCollapseHandler(false)}
              />
            ) : null}
            <div className={styles.Dash}>
              <Switch>
                {hasRole(roles, ["Admin"]) && (
                  <Route exact path="/" component={Accounts} />
                )}
                {hasRole(roles, ["Tagger", "Clerk"]) && (
                  <Route exact path="/taggerForm" component={TaggerForm} />
                )}
                {hasRole(roles, ["Clerk"]) && (
                  <Route exact path="/memorials" component={Memorials} />
                )}
                {hasRole(roles, ["Clerk"]) && (
                  <Route
                    exact
                    path="/memorialTypes"
                    component={MemorialTypes}
                  />
                )}
                {/* <Route exact path='/attributes' component={Attributes} /> */}
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
