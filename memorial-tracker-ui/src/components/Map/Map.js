import React from "react";
import GoogleMap from "google-map-react";

import { MapCenterContext } from "../../containers/App";
import { getCoordinatesOfMemorial } from "../../utils/utils";
import Icon from "./Icon/Icon";
import styles from "./Map.module.css";

class Map extends React.Component {
  render() {
    console.log(
      "Google Cloud API Key",
      process.env.REACT_APP_GOOGLE_CLOUD_API_KEY
    );
    return (
      <div className={styles.Map}>
        <MapCenterContext.Consumer>
          {(mapCenter) => (
            <GoogleMap
              bootstrapURLKeys={{
                key: process.env.REACT_APP_GOOGLE_CLOUD_API_KEY,
              }}
              center={mapCenter}
              defaultZoom={14}
            >
              <Icon
                Icon="https://memorialtrackrphotos.blob.core.windows.net/memorialicons/user-location.png"
                onIconClick={() => {}}
                closeBubbleClick={() => {}}
                lat={this.props.userCoordinates.lat}
                lng={this.props.userCoordinates.lng}
                hideModal={true}
              />

              {this.props.Memorials.map((memorial) => {
                const coordinates = getCoordinatesOfMemorial(memorial);
                return (
                  <Icon
                    memorial={memorial}
                    key={memorial.Id}
                    lat={coordinates.lat}
                    lng={coordinates.lng}
                    typeName={memorial.Type.Name}
                    Icon={memorial.Type.Icon}
                    Type={memorial.Type}
                    Name={memorial.Name}
                    hideIcon={memorial.hideIcon}
                    hideModal={memorial.hideModal}
                    onIconClick={() => this.props.onIconClick(memorial.Id)}
                    closeBubbleClick={() => this.props.bubbleCloseClick()}
                  />
                );
              })}
            </GoogleMap>
          )}
        </MapCenterContext.Consumer>
      </div>
    );
  }
}

export default Map;
