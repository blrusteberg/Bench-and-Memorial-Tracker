import React from "react";
import axios from "axios";

import Map from "../components/Map/Map";
import Sidebar from "../components/SideBar/Sidebar";
import styles from "./App.module.css";
import { getCoordinatesOfMemorial } from "../utils/utils";

import { Modal, Button, Layout, Space, Typography, Divider } from "antd";
import "antd/dist/antd.css";

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
              Required: null,
              Value: {
                Id: "",
                Value: "",
                AttributeId: "",
                MemorialId: "",
              },
            },
          ],
          Icon: "",
        },
      },
    ],
    error: null,
    isLoading: true,
    mapCenter: { lat: 0, lng: 0 },
    userCoordinates: { lat: 0, lng: 0 },
    visible: false,
    showSidebar: false,
  };

  componentDidMount() {
    axios
      .get(
        `${
          process.env.REACT_APP_API_BASE_URL
        }/memorials/types/attributes/values?statusFilters=${JSON.stringify([
          "live",
        ])}`
      )
      .then(
        (result) => {
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
    let mapCenter = this.state.mapCenter;
    memorials.forEach((memorial) => {
      memorial.hideBubble = true;
      if (memorial.Id === id) {
        memorial.hideBubble = false;
        mapCenter = getCoordinatesOfMemorial(memorial);
      }
    });
    this.setState({ Memorials: memorials, mapCenter: mapCenter });
  };

  bubbleCloseClickHandler = () => {
    const memorials = [...this.state.Memorials];
    memorials.map((memorial) => {
      return { ...memorial, hideBubble: true };
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
          userCoordinates: {
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

  showDrawer = () => {
    this.setState({
      showSidebar: !this.state.showSidebar,
    });
  };

  render() {
    const { Header, Content } = Layout;
    const content = this.state.error ? (
      <div className={styles.error}>Oops, something's not right here...</div>
    ) : !this.state.isLoading ? (
      <div className={styles.App}>
        <Layout>
          <Header>
            <Space split={<Divider type="vertical" />}>
              <Typography.Link>
                <Button type="primary" onClick={this.showModal}>
                  Memorial Suggestion Form
                </Button>
              </Typography.Link>
              <Typography.Link>
                <Button type="primary" onClick={this.showDrawer}>
                  {this.state.showSidebar ? "Close search" : "Open search"}
                </Button>
              </Typography.Link>
            </Space>
            <Modal
              title="Blank Modal"
              visible={this.state.visible}
              onOk={this.handleOkOrCancel}
              onCancel={this.handleOkOrCancel}
            >
              <p>This is a blank modal!</p>
            </Modal>
          </Header>
          <Content>
            <MapCenterContext.Provider value={this.state.mapCenter}>
              <Map
                userCoordinates={this.state.userCoordinates}
                Memorials={this.state.Memorials}
                currentLocation={this.state.currentLocation}
                onIconClick={this.onIconClick}
                bubbleCloseClick={this.bubbleCloseClickHandler}
              />
              <Sidebar
                Memorials={this.state.Memorials}
                searchHandler={this.searchHandler}
                onSidebarClick={this.updateMapCenter}
                showSidebar={this.state.showSidebar}
              />
            </MapCenterContext.Provider>
          </Content>
        </Layout>
      </div>
    ) : (
      <h1 className={styles.loadingMessage}>Loading...</h1>
    );
    return content;
  }
}

export default App;
