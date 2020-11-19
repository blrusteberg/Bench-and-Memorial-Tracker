import React from "react";
import axios from "axios";

import Map from "../components/Map/Map";
import Sidebar from "../components/SideBar/Sidebar";
import styles from "./App.module.css";
import { getCoordinatesOfMemorial } from "../utils/utils";
import moment from 'moment';

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
    memorialTypes: [],
    nameFilter: "",
    typeFilter: [],
    dateFilter: null
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
              memorial.hideModal = true;
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

      axios
        .get(
          `${
            process.env.REACT_APP_API_BASE_URL
          }/types/attributes?statusFilters=${JSON.stringify([
            "live",
          ])}`
        )
        .then(
          (result) => {
            let memorialTypes = [];
            if (result.data.length > 0) {
              memorialTypes = result.data.map(type => type.Name)
            }
            this.setState({
              memorialTypes: memorialTypes,
              isLoading: false,
            })
          },
          (error) => {
            this.setState({
              isLoading: false,
              error: error,
            });
          }
        );
  }

  filterHandler = (filter, typeOfFilter) => {
    if(typeOfFilter === "NAME"){
      this.setState({
        nameFilter: filter
      }, () => {
        this.searchHandler();
      });
    } else if(typeOfFilter === "TYPE"){
      this.setState({
        typeFilter: filter
      }, () => {
        this.searchHandler();
      });
    } else if(typeOfFilter === "DATE"){
      this.setState({
        dateFilter: filter
      }, () => {
        this.searchHandler();
      });
    }
  }

  searchHandler = () => {
    const memorials = [...this.state.Memorials];
    let typeFilter = this.state.typeFilter.length === 0 ? this.state.memorialTypes : this.state.typeFilter;
    let startDate = moment("01/01/0001", "MM/DD/YYYY");
    let endDate   = moment("01/01/9999", "MM/DD/YYYY");
    let dateFilter = this.state.dateFilter === null ? [startDate, endDate] : this.state.dateFilter;
    memorials.forEach((memorial) => {
      let hideIcon = true;
      let memorialDate = moment(memorial.DateRecorded, "MM/DD/YYYY")
      if (
        memorial.Name.toLowerCase().includes(this.state.nameFilter.trim().toLowerCase())
        && typeFilter.includes(memorial.Type.Name)
        && memorialDate.isBetween(dateFilter[0], dateFilter[1])
      ) {
        hideIcon = false;
      }
      memorial.hideIcon = hideIcon;
      if (memorial.hideIcon) {
        memorial.hideModal = true;
      }
    });
    this.setState({ Memorials: memorials });
  };

  onIconClick = (id) => {
    const memorials = [...this.state.Memorials];
    let mapCenter = this.state.mapCenter;
    memorials.forEach((memorial) => {
      memorial.hideModal = true;
      if (memorial.Id === id) {
        memorial.hideModal = false;
        mapCenter = getCoordinatesOfMemorial(memorial);
      }
    });
    this.setState({ Memorials: memorials, mapCenter: mapCenter });
  };

  bubbleCloseClickHandler = () => {
    const memorials = [...this.state.Memorials];
    memorials.map((memorial) => {
      return { ...memorial, hideModal: true };
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
                searchHandler={this.filterHandler}
                onSidebarClick={this.updateMapCenter}
                showSidebar={this.state.showSidebar}
                showDrawer={this.showDrawer}
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
