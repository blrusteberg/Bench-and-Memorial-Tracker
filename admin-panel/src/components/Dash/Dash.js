import React from "react";

import Accounts from "./Accounts/Accounts";
import Memorials from "./Memorials/Memorials";
import MemorialTypes from "./MemorialTypes/MemorialTypes";
import Settings from "./Settings/Settings";

import styles from "./Dash.module.css";

const dash = (props) => {
  let dashView = null;
  switch (props.page) {
    case "Accounts":
      dashView = <Accounts />;
    case "Memorials":
      dashView = <Memorials />;
    case "Memorial Types":
      dashView = <MemorialTypes />;
    case "Settings":
      dashView = <Settings />;
  }
  return <div className={styles.Dash}>{dashView}</div>;
};

export default dash;
