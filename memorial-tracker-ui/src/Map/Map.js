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
          <Icon lat={m.latitude} lng={m.longitude} type={m.type} key={m.id} />
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default map;
