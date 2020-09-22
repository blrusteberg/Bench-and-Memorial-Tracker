import React from "react";

import { MapCenterContext } from "../../containers/App";
import Memorial from "./Memorial/Memorial";
import styles from "./Sidebar.module.css";
import { getCoordinatesOfMemorial } from "../../utils/utils";

class Sidebar extends React.Component {
  state = {
    lastClickedCoordinates: {
      lat: 0,
      lng: 0,
    },
  };

  onSidebarClick = (memorialId) => {
    let coordinates = { lat: 0, lng: 0 };
    this.props.Memorials.forEach((memorial) => {
      if (memorial.Id === memorialId) {
        coordinates = getCoordinatesOfMemorial(memorial);
        this.setState({
          lastClickedCoordinates: coordinates,
        });
      }
    });
    this.props.onSidebarClick(coordinates);
  };

  render() {
    return (
      <div className={styles.Sidebar}>
        <input
          onChange={(event) => this.props.searchHandler(event.target.value)}
          className={styles.SearchInput}
          type="text"
          placeholder="What are you looking for?"
        />
        <MapCenterContext.Provider value={this.state.lastClickedCoordinates}>
          <div className={styles.ScrollMenu}>
            {this.props.Memorials.map((memorial) => {
              return (
                <Memorial
                  key={memorial.Id}
                  Id={memorial.Id}
                  Name={memorial.Name}
                  Type={memorial.Type}
                  hide={memorial.hideIcon}
                  onSidebarClick={this.onSidebarClick}
                />
              );
            })}
          </div>
        </MapCenterContext.Provider>
      </div>
    );
  }
}

export default Sidebar;
