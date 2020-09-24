import React from "react";
import styles from "./InfoBubble.module.css";

const infoBubble = (props) => {
  const bubbleStyle = [];

  if (props.hideBubble) {
    bubbleStyle.push(styles.hidden);
  } else {
    bubbleStyle.push(styles.popUp);
  }

  return (
    <div className={bubbleStyle.join("")}>
      <div className={styles.type}>
        {props.type}
        <button className={styles.closeButton} onClick={props.closeBubbleClick}>
          x
        </button>
      </div>
      <div className={styles.popUpText}>
        <div className={styles.memorialName}>{props.Name}</div>
        {props.Type.Attributes.map((attribute) => (
          <div className={styles.attributesClass} key={attribute.Id}>
            {attribute.Name}: {attribute.Value}
          </div>
        ))}
        <button
          className={styles.directionsButton}
          onClick={props.onDirectionsClick}
        >
          Take me here
        </button>
      </div>
    </div>
  );
};

export default infoBubble;
