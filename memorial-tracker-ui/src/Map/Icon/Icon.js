import React from "react";
import styles from "./Icon.module.css";

const icon = (props) => {
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
      <img
        className={styles.IconImage}
        src={`./icons/${type}.png`}
        alt="memorial icon"
      />
  );
};

export default icon;
