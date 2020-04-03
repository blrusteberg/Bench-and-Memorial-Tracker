import React from "react";
import styles from "./Memorial.module.css";

const memorial = (props) => {
  let type = "";
  switch (props.type) {
    case "tree":
      type = "tree";
      break;
    case "bench":
      type = "bench";
      break;
    case "art":
      type = "art";
      break;
    default:
      type = "memorial";
  }
  return (
    <div className={styles.Memorial}>
      <img
        className={styles.Icon}
        src={`./icons/${type}.png`}
        alt="memorial type icon"
      />
      <div className={styles.MemorialInfo}>
        <p>{props.donator}</p>
      </div>
    </div>
  );
};

export default memorial;
