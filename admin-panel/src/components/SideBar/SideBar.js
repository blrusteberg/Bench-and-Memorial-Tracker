import React from "react";
import { CaretLeftOutlined } from "@ant-design/icons";
import { Button } from 'antd';
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
      </div>
    );
  }
}

export default SideBar;
