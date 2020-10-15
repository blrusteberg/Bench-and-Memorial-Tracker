import React from "react";
import { CaretLeftOutlined } from "@ant-design/icons";

import NavigationPanel from "./NavigationPanel/NavigationPanel";
import styles from "./SideBar.module.css";

class SideBar extends React.Component {
  state = {
    sideBarCloseClick: false,
    sideBarOpenClick: false,
  };

  render() {
    return (
      <div className={styles.SideBar}>
        <div className={styles.headerWrapper}>
          <div className={styles.accountType}>{this.props.accountType}</div>
          <CaretLeftOutlined
            className={styles.closeSideBarIcon}
            onClick={this.props.sideBarCollapseHandler}
          />
        </div>
        <div className={styles.navigationPanelWrapper}>
          <NavigationPanel
            handleNavigationClick={this.props.handleNavigationClick}
            roles={this.props.roles}
          />
        </div>
        <div className={styles.roleSelectWrapper}>
          Choose role:
          <select
            id="roles"
            styles={styles.roleSelect}
            onChange={(event) => this.props.handlePermissionChange(event)}
          >
            <option value="admin">Admin</option>
            <option value="clerk">Clerk</option>
            <option value="tagger">Tagger</option>
          </select>
        </div>
      </div>
    );
  }
}

export default SideBar;
