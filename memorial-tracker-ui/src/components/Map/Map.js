import React from "react";
import GoogleMapReact from "google-map-react";
import Icon from "./Icon/Icon";
import styles from "./Map.module.css";

const map = (props) => {
  return (
    <div className={styles.Map}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }} //key:AIzaSyDrtzpv9c0WNdx6RDzrvijV76YoiUuKNf
        defaultCenter={props.currentLocation}
        defaultZoom={14}
      >
        {props.memorials.map((m) => (
          <Icon
            lat={m.attributes[0].value}
            lng={m.attributes[1].value}
            type={m.type}
            guid={m.guid}
            attributes ={m.attributes}
            hideIcon={m.hideIcon}
            hideBubble={m.hideBubble}
            clicked={() => props.iconClicked(m.guid)}
            closeBubbleClick = {() => props.bubbleCloseClick()}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default map;
