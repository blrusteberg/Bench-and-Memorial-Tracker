import React from "react";

import styles from "./NavigationPanel.module.css";

const navigationPanel = (props) => {
  return (
    <div className={styles.NavigationPanel}>
      <ul onClick={props.handleNavigationClick}>
        <li>
          <div id="Accounts">Accounts</div>
        </li>
        <li>
          <div id="Memorials">Memorials</div>
        </li>
        <li>
          <div id="Memorial Types">Memorial Types</div>
        </li>
        <li>
          <div id="Settings">Settings</div>
        </li>
      </ul>
    </div>
  );
};

export default navigationPanel;
