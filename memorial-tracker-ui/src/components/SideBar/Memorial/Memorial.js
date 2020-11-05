import React from "react";
import styles from "./Memorial.module.css";
import { Space } from "antd";

const memorial = (props) => {
  const assignedStyles = [];
  if (props.hide) {
    assignedStyles.push(styles.hidden);
  } else {
    assignedStyles.push(styles.Memorial);
  }

  return (
    <Space type="vertical">
      <div
        className={assignedStyles.join(" ")}
        onClick={() => props.onSidebarClick(props.Id)}
      >
        <img
          className={styles.icon}
          src={props.Type.Icon}
          alt="memorial type icon"
        />
        <div className={styles.memorialInfo}>
          <div>{props.Name}</div>
        </div>
      </div>
    </Space>
  );
};

export default memorial;
