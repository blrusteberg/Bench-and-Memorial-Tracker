import React from "react";
import GoogleMapReact from "google-map-react";

import Icon from "./Icon";

const GoogleMap = ({ memorialData, currentLocation }) => {
  // const [center, setCenter] = useState(currentLocation);
  // const [zoom, setZoom] = useState(15);

  const zoom = 15;
  const center = currentLocation;

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
          type={memorialData[0].type}
          id={memorialData[0].id}
        />
        <Icon
          lat={memorialData[1].latitude}
          lng={memorialData[1].longitude}
          type={memorialData[1].type}
          id={memorialData[1].id}
        />
        <Icon
          lat={memorialData[2].latitude}
          lng={memorialData[2].longitude}
          type={memorialData[2].type}
          id={memorialData[2].id}
        />
        <Icon
          lat={memorialData[3].latitude}
          lng={memorialData[3].longitude}
          type={memorialData[3].type}
          id={memorialData[3].id}
        />
        <Icon
          lat={memorialData[4].latitude}
          lng={memorialData[4].longitude}
          type={memorialData[4].type}
          id={memorialData[4].id}
        />
        <Icon
          lat={memorialData[5].latitude}
          lng={memorialData[5].longitude}
          type={memorialData[5].type}
          id={memorialData[5].id}
        />
      </GoogleMapReact>
    </div>
  );
};

export default GoogleMap;
