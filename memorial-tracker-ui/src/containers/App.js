import React from "react";
import axios from "axios";

import Map from "../components/Map/Map";
import Sidebar from "../components/SideBar/Sidebar";
import styles from "./App.module.css";

import { Modal, Button } from 'antd';
import 'antd/dist/antd.css';

export const MapCenterContext = React.createContext();

class App extends React.Component {
  state = {
    Memorials: [
      {
        Id: "",
        Type: {
          Id: "",
          Name: "",
          Attributes: [
            {
              Id: "",
              Name: "",
              ValueType: "",
              Required: null,
              Value: "",
            },
          ],
        },
      },
    ],
    error: null,
    isLoading: true,
    mapCenter: { lat: 0, lng: 0 },
    visible: false,
  };

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/memorials/types/attributes/values`).then(
      (result) => {
        console.log("DATA", result.data);
        this.setState({
          Memorials: result.data.map((memorial) => {
            memorial.hideIcon = false;
            memorial.hideBubble = true;
            return memorial;
          }),
          isLoading: false,
          mapCenter: this.getUserLocation(),
        });
      },
      (error) => {
        this.setState({
          isLoading: false,
          error: error,
        });
      }
    );
  }

  searchHandler = (searchText) => {
    const memorials = [...this.state.Memorials];
    memorials.forEach((memorial) => {
      let hideIcon = true;
      if (
        memorial.Name.toLowerCase().includes(searchText.trim().toLowerCase())
      ) {
        hideIcon = false;
      }
      memorial.hideIcon = hideIcon;
      if (memorial.hideIcon) {
        memorial.hideBubble = true;
      }
    });
    this.setState({ Memorials: memorials });
  };

  onIconClick = (id) => {
    const memorials = [...this.state.Memorials];
    memorials.forEach((memorial) => {
      memorial.hideBubble = true;
      if (memorial.Id === id) {
        memorial.hideBubble = false;
      }
    });
    this.setState({ Memorials: memorials });
  };

  bubbleCloseClickHandler = () => {
    const memorials = [...this.state.Memorials];
    memorials.map((memorial) => {
      memorial.hideBubble = true;
    });
    this.setState({ Memorials: memorials });
  };

  getUserLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      if (pos) {
        this.setState({
          mapCenter: {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          },
        });
      } else {
        alert("Unable to get geolocation..");
      }
    });
  };

  updateMapCenter = (coordinates) => this.setState({ mapCenter: coordinates });

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOkOrCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const content = this.state.error ? (
      <div className={styles.error}>Oops, something's not right here...</div>
    ) : !this.state.isLoading ? (
      <div className={styles.App}>
        <MapCenterContext.Provider value={this.state.mapCenter}>
          <Map
            Memorials={this.state.Memorials}
            currentLocation={this.state.currentLocation}
            onIconClick={this.onIconClick}
            bubbleCloseClick={this.bubbleCloseClickHandler}
          />
          <Sidebar
            Memorials={this.state.Memorials}
            searchHandler={this.searchHandler}
            onSidebarClick={this.updateMapCenter}
          />
        </MapCenterContext.Provider>
        <div className={styles.modalWrapper}>
          <Button type="primary" onClick={this.showModal}>Open blank modal</Button>
        </div>
        <Modal
          title="Blank Modal"
          visible={this.state.visible}
          onOk={this.handleOkOrCancel}
          onCancel={this.handleOkOrCancel}
        >
          <p>This is a blank modal!</p>
        </Modal>
      </div>
    ) : (
      <h1 className={styles.loadingMessage}>Loading...</h1>
    );
    return content;
  }
}

export default App;
