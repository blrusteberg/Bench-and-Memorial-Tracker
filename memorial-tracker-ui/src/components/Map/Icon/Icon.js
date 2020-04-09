import React from "react";
import styles from "./Icon.module.css";

const icon = (props) => {
  const assignedStyles = [];
  if (props.hide) {
    assignedStyles.push(styles.hidden);
  } else {
    assignedStyles.push(styles.IconImage);
  }
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
      className={assignedStyles.join(" ")}
      src={`./icons/${type}.png`}
      alt="memorial icon"
      onClick={props.clicked}
    />
  );
};

export default icon;
