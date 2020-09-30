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
          <div className={styles.headerContainer}>
            <div className={styles.accountName}>Account Type</div>
            <div className={styles.closeSideBarIconWrapper}>
              <CaretLeftOutlined
                className={styles.closeSideBarIcon}
                onClick={this.props.sideBarCollapseHandler}

              />
            </div>
          </div>
        </div>
        <div className={styles.NavigationPanelWrapper}>
          <NavigationPanel
            handleNavigationClick={this.props.handleNavigationClick}
            handlePermissionChange={this.props.handlePermissionChange}
            roles={this.props.roles}
          />
        </div>
      </div>
    );
  }
}

export default SideBar;
