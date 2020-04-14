import React from "react";
import styles from "./Icon.module.css";

const icon = (props) => {
  var url = `https://www.google.com/maps/dir/?api=1&origin=&destination=${props.lat},${props.lng}&travelmode=walking`;
  const assignedStyles = [];
  const bubbleStyle = [];
  if (props.hide) {
    assignedStyles.push(styles.hidden);
  } else {
    assignedStyles.push(styles.IconImage);
  }

  if (props.hideBubble) {
    bubbleStyle.push(styles.hidden);
  } else {
    bubbleStyle.push(styles.popUp);
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
    <div className={styles.icon}>
      <img
        className={assignedStyles.join(" ")}
        src={`./icons/${type}.png`}
        alt="memorial icon"
        onClick={props.clicked}
      />
      <div className={bubbleStyle.join("")}>
        <div className={styles.type}>
          {type}
          <button
            className={styles.closeButton}
            onClick={props.closeBubbleClick}
          >
            X
          </button>
        </div>
        <div className={styles.popUpText}>
          Donor: {props.donator} <br />
          Longitude: {props.lng} <br />
          Latitude: {props.lat} <br />
          Directions:
          <a href={url} target="_blank">
            Google Maps
          </a>
        </div>
      </div>
    </div>
  );
};

export default icon;
