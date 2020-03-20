import React, { useState } from "react";
import GoogleMapReact from "google-map-react";

import Icon from "./Icon";

const GoogleMap = ({ memorialData, currentLocation }) => {
  const [center, setCenter] = useState(currentLocation);
  const [zoom, setZoom] = useState(15);
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        <Icon
          lat={memorialData[0].latitude}
          lng={memorialData[0].longitude}
        />
        <Icon
          lat={memorialData[1].latitude}
          lng={memorialData[1].longitude}
        />
      </GoogleMapReact>
    </div>
  );
};

export default GoogleMap;
