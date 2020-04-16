import React from "react";
import styles from "./Icon.module.css";
import InfoBubble from "./InfoBubble/InfoBubble";

const icon = (props) => {
  const assignedStyles = [];

  if (props.hide) {
    assignedStyles.push(styles.hidden);
  } else {
    assignedStyles.push(styles.IconImage);
  }


  let type = "";
  switch (props.type) {
    case "Tree":
      type = "Tree";
      break;
    case "Bench":
      type = "Bench";
      break;
    case "Art":
      type = "Art";
      break;
    default:
      type = "Memorial";
  }

  return (
    <div className={styles.icon}>
      <img
        className={assignedStyles.join(" ")}
        src={`./icons/${type}.png`}
        alt="memorial icon"
        onClick={props.clicked}
      />
      <InfoBubble 
        attributes={props.attributes}
        closeBubbleClick={props.closeBubbleClick}
        hideBubble={props.hideBubble}
        type = {props.type} 
        />
    </div>
  );
};

export default icon;
