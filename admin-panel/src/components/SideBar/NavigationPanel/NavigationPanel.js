import React from "react";
import styles from "./NavigationPanel.module.css";

const navigationPanel = (props) => {
  return (
    <div className={styles.NavigationPanel}>
      <ul onClick={props.handleNavigationClick}>
        <li>
          <div className={styles.nav} id="Accounts">
            Accounts
            <img 
              className={styles.img}
              alt="account icon"
              src="./images/accountImg.png"
            />
          </div>
        </li>
        <li>
          <div className={styles.nav} id="Memorials">
            Memorials
            <img 
              className={styles.img}
              alt="account icon"
              src="./images/memorialImg.png"
            />
          </div>
        </li>
        <li>
          <div className={styles.nav} id="Memorial Types">
            Memorial Types
            <img 
              className={styles.img}
              alt="account icon"
              src="./images/typesImg.png"
            />
          </div>
        </li>
        <li>
          <div className={styles.nav} id="Settings">
            Settings
            <img 
              className={styles.img}
              alt="account icon"
              src="./images/settingsImg.png"
            />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default navigationPanel;
