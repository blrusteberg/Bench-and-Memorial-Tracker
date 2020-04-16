import React from "react";
import styles from "./Memorial.module.css";

const memorial = (props) => {
  const assignedStyles = [];
  if (props.hide) {
    assignedStyles.push(styles.hidden);
  } else {
    assignedStyles.push(styles.Memorial);
  }

  let type = "";
  switch (props.type.toLowerCase()) {
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
    <div className={assignedStyles.join(" ")}>
      <img
        className={styles.Icon}
        src={`./icons/${type}.png`}
        alt="memorial type icon"
      />
      <div className={styles.MemorialInfo}>
        {props.attributes.slice(2).map((a) => {
          return (
            <p>
              {a.name}:{" "}
              {typeof a.value === "boolean"
                ? a.value
                  ? "Yes"
                  : "No"
                : a.value}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default memorial;
