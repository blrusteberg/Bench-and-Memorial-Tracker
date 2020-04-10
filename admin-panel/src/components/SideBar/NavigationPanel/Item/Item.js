import React from "react";
import styles from "./Item.module.css";

const item = (props) => {
  return (
    <div className={styles.Item}>
      <h1>{props.label}</h1>
    </div>
  );
};

export default item;
