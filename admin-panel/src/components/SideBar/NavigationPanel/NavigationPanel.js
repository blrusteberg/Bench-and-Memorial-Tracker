import React from "react";

import styles from "./NavigationPanel.module.css";

const navigationPanel = (props) => {
  return (
    <div className={styles.NavigationPanel}>
      <ul onClick={props.handleNavigationClick}>
        <li>
          <div className={styles.navWrapper}>
            <div className={styles.iconWrapper}>
              <img
                className={styles.img}
                alt="account icon"
                src="./images/accountImg.png"
              />
            </div>
            <div className={styles.nav} id="Accounts">
              Accounts
            </div>
          </div>
        </li>
        <li>
          <div className={styles.navWrapper}>
            <div className={styles.iconWrapper}>
              <img
                className={styles.img}
                alt="tagger form icon"
                src="./images/taggerForm.png"
              />
            </div>
            <div className={styles.nav} id="Tagger Form">
              Tagger Form
            </div>
          </div>
        </li>
        <li>
          <div className={styles.navWrapper}>
            <div className={styles.iconWrapper}>
              <img
                className={styles.img}
                alt="account icon"
                src="./images/memorialImg.png"
              />
            </div>
            <div className={styles.nav} id="Memorials">
              Memorials
            </div>
          </div>
        </li>
        <li>
          <div className={styles.navWrapper}>
            <div className={styles.iconWrapper}>
              <img
                className={styles.img}
                alt="account icon"
                src="./images/typesImg.png"
              />
            </div>
            <div className={styles.nav} id="Memorial Types">
              Types
            </div>
          </div>
        </li>
        <li>
          <div className={styles.navWrapper}>
            <div className={styles.iconWrapper}>
              <img
                className={styles.img}
                alt="account icon"
                src="./images/settingsImg.png"
              />
            </div>
            <div className={styles.nav} id="">
              Attributes
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default navigationPanel;
