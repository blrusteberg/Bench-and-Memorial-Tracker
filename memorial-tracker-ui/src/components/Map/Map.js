import React from "react";
import GoogleMap from "google-map-react";

import { MapCenterContext } from "../../containers/App";
import { getCoordinatesOfMemorial } from "../../utils/utils";
import Icon from "./Icon/Icon";
import styles from "./Map.module.css";

class Map extends React.Component {
  render() {
    return (
      <div className={styles.Map}>
        <MapCenterContext.Consumer>
          {(mapCenter) => (
            <GoogleMap
              bootstrapURLKeys={{ key: "" }}
              center={mapCenter}
              defaultZoom={14}
            >
              {this.props.Memorials.map((memorial) => {
                const coordinates = getCoordinatesOfMemorial(memorial);
                return (
                  <Icon
                    key={memorial.Id}
                    lat={coordinates.lat}
                    lng={coordinates.lng}
                    typeName={memorial.Type.Name}
                    Icon={memorial.Type.Icon}
                    Type={memorial.Type}
                    Name={memorial.Name}
                    hideIcon={memorial.hideIcon}
                    hideBubble={memorial.hideBubble}
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
