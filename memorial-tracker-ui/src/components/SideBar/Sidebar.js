import React from "react";

import { MapCenterContext } from "../../containers/App";
import Memorial from "./Memorial/Memorial";
import styles from "./Sidebar.module.css";
import { getCoordinatesOfMemorial } from "../../utils/utils";
import { Drawer, Form } from 'antd';
import { CaretLeftOutlined } from "@ant-design/icons";

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

  // showDrawer = () => {
  //   this.setState({
  //     visible: true,
  //   });
  // };

  // onClose = () => {
  //   this.setState({
  //     visible: false
  //   })
  // };

  render() {
    return (
      // <div className={styles.Sidebar}>
      <div className={styles.sidebarContainer}>
        <Drawer
          placement="right"
          closable={false}
          visible={this.props.showSidebar}
          onClose={this.props.toggleSidebar}
          mask={false}
          // onClick={this.onClose}
        >
        <CaretLeftOutlined
          onClick={this.props.toggleSidebar} 
          className={styles.closeSideBarIcon}
        />
        <input
          onChange={(event) => this.props.searchHandler(event.target.value)}
          className={styles.SearchInput}
          type="text"
          placeholder="What are you looking for?"
        />
        <MapCenterContext.Provider value={this.state.lastClickedCoordinates}>
          <div>
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
        </Drawer>
      </div>
    );
  }
}

export default Sidebar;
