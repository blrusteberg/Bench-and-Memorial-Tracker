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
        {props.attributes.slice(2).map((a) => (
          <div className = {styles.attributesClass}>
            {a.name}:{" "} 
            {typeof a.value === "boolean" ? (a.value ? "Yes" : "No") : a.value} 
          </div>
        ))} 
        <button
          className={styles.googleMapsButton}
          onClick={props.googleMapsClick}
        >
          Directions
        </button>
      </div>
    </div>
  );
};

export default infoBubble;
