import React from "react";
import styles from "./Memorial.module.css";

const memorial = (props) => {
  const assignedStyles = [];
  if (props.hide) {
    assignedStyles.push(styles.hidden);
  } else {
    assignedStyles.push(styles.Memorial);
  }

  return (
    <div>
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
          <div className={styles.wordWrapper}>{props.Name}</div>
        </div>
      </div>
    </div>
  );
};

export default memorial;
