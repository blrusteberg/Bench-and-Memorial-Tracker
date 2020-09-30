import React from "react";

import NavigationPanel from "./NavigationPanel/NavigationPanel";
import Dash from "../Dash/Dash";

import styles from "./SideBar.module.css";

const sidePanel = (props) => {
  return (
    <div className={styles.SideBar}>
      <div>{props.accountType}</div>
      <button
        className={styles.hideNavButton}
        onClick={props.sideBarCollapseHandler}
      >
        <img src="./images/arrowLeft.png" alt="arrow-left"></img>
      </button>
      <NavigationPanel
        handleNavigationClick={props.handleNavigationClick}
        handlePermissionChange={props.handlePermissionChange}
        roles={props.roles}
      />
    </div>
  );
};

export default SideBar;
