import React from "react";
import styles from "./InfoBubble.module.css";


const infoBubble = (props) => {
  var url = `https://www.google.com/maps/dir/?api=1&origin=&destination=${props.attributes[0].value},${props.attributes[1].value}&travelmode=walking`;


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
          X
        </button>
      </div>
      <div className={styles.popUpText}>
        {props.attributes.forEach((a) => (
          <p>
            {a.name}: {a.value}
          </p>
        ))}

        <a href={url} target="_blank">
          Google Maps
        </a>
      </div>
    </div>
  );
};

export default infoBubble;
