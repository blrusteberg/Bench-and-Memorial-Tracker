import React from "react";

import styles from "./NavigationPanel.module.css";
import { Link } from 'react-router-dom';
import { hasRole } from '../../../services/auth';

const navigationPanel = (props) => {
  return (
    <div className={styles.NavigationPanel}>
      <ul onClick={props.handleNavigationClick}>
        {hasRole(props.roles, ['Admin']) &&
          <li>
            <div className={styles.navWrapper}>
              <div className={styles.iconWrapper}>
                <img
                  className={styles.img}
                  alt="account icon"
                  src="./images/accountImg.png"
                />
              </div>
              <Link to="/" className={styles.nav} id="Accounts">
                Accounts
              </Link>
            </div>
          </li>
        }
        <li>
          <div className={styles.navWrapper}>
            <div className={styles.iconWrapper}>
              <img
                className={styles.img}
                alt="tagger form icon"
                src="./images/taggerForm.png"
              />
            </div>
            <Link to="taggerForm" className={styles.nav} id="Tagger Form">
              Tagger Form
            </Link>
          </div>
        </li>
        {hasRole(props.roles, ['Clerk']) && [
          <li>
            <div className={styles.navWrapper}>
              <div className={styles.iconWrapper}>
                <img
                  className={styles.img}
                  alt="account icon"
                  src="./images/memorialImg.png"
                />
              </div>
              <Link to="memorials" className={styles.nav} id="Memorials">
                Memorials
              </Link>
            </div>
          </li>
          ,
          <li>
            <div className={styles.navWrapper}>
              <div className={styles.iconWrapper}>
                <img
                  className={styles.img}
                  alt="account icon"
                  src="./images/typesImg.png"
                />
              </div>
              <Link to="memorialTypes" className={styles.nav} id="Memorial Types">
                Types
              </Link>
            </div>
          </li>
          ,
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
      ]}
      </ul>
      <label>Choose role:</label>
      <select onChange={(event) => props.handlePermissionChange(event)} id="roles">
        <option value="admin">Admin</option>
        <option value="clerk">Clerk</option>
        <option value="tagger">Tagger</option>
      </select>
    </div>
  );
};

export default navigationPanel;
