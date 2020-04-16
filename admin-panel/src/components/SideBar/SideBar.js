import React from "react";

import NavigationPanel from "./NavigationPanel/NavigationPanel";
import styles from "./SideBar.module.css";

const sidePanel = (props) => {
  return (
    <div className={styles.SideBar}>
      <img
        alt="city of edwardsville icon"
        src="./images/cityOfEdwardsville.jpg"
      />
      <div>{props.accountType}</div>
      <NavigationPanel handleNavigationClick={props.handleNavigationClick} />
    </div>
  );
};

export default sidePanel;
