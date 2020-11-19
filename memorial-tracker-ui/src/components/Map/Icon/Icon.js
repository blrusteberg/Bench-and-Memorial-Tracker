import React, { useState } from "react";
import styles from "./Icon.module.css";
import InfoModal from "./InfoModal/InfoModal";

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

  return (
    <div>
      <img
        className={assignedStyles.join(" ")}
        src={props.Icon}
        alt="memorial icon"
        onClick={props.onIconClick}
      />
      {props.hideModal ? null : (
        <InfoModal
          memorial={props.memorial}
          Name={props.Name}
          closeBubbleClick={props.closeBubbleClick}
          hideModal={props.hideModal}
          onDirectionsClick={() => onDirectionsClick(props.lat, props.lng)}
          type={props.type}
        />
      )}
    </div>
  );
};

export default icon;
