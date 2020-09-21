import React from "react";

import NavigationPanel from "./NavigationPanel/NavigationPanel";
import styles from "./SideBar.module.css";

const sidePanel = (props) => {
  return (
    <div className={styles.SideBar}>
      <div>{props.accountType}</div>
      <NavigationPanel handleNavigationClick={props.handleNavigationClick} />
    </div>
  );
};

export default sidePanel;
