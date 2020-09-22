import React from "react";
import styles from "./Icon.module.css";
import InfoBubble from "./InfoBubble/InfoBubble";

const onDirectionsClick = (lat, lng) => {
  const url = `https://www.google.com/maps/dir/?api=1&origin=&destination=${lat},${lng}&travelmode=driving`;
  const win = window.open(url, "_blank");
  win.focus(window);
};

const icon = (props) => {
  const assignedStyles = [];

  if (props.hideIcon) {
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
    case "Historical Building":
      type = "Building";
      break;
    default:
      type = "Memorial";
  }

  return (
    <div className={styles.icon}>
      <img
        className={assignedStyles.join(" ")}
        src={`./icons/memorial.png`}
        alt="memorial icon"
        onClick={props.onIconClick}
      />
      <InfoBubble
        Type={props.Type}
        Name={props.Name}
        closeBubbleClick={props.closeBubbleClick}
        hideBubble={props.hideBubble}
        onDirectionsClick={onDirectionsClick}
        type={props.type}
      />
    </div>
  );
};

export default icon;
