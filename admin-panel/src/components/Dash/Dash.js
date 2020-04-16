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
      break;
    case "Memorials":
      dashView = <Memorials />;
      break;
    case "Memorial Types":
      dashView = <MemorialTypes />;
      break;
    case "Settings":
      dashView = <Settings />;
      break;
  }
  return <div className={styles.Dash}>{dashView}</div>;
};
export default dash;
