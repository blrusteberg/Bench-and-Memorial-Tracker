import React from "react";
import "./App.css";
import Map from "../components/Map/Map";
import Sidebar from "../components/SideBar/Sidebar";
import axios from "axios";

class App extends React.Component {
  state = {
    memorials: [
      {
        id: 0,
        type: "tree",
        donator: "Jane Doe",
        latitude: 38.806649,
        longitude: -89.938928,
      },
    ],
    error: null,
    isLoaded: false,
    currentLocation: { lat: 38.812203, lng: -89.957655 },
  };

  componentDidMount() {
    console.log("[App.js] componentDidMount");
    axios.get("http://localhost:1337/api/memorials").then(
      (result) => {
        console.log(result.data.memorials);
        result.data.memorials.map((m) => (m.hide = false));
        this.setState({
          memorials: result.data.memorials,
          isLoaded: true,
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error: error,
        });
      }
    );
  }

  searchHandler = (searchText) => {
    const memorials = [...this.state.memorials];
    memorials.forEach((m) => {
      m.hide = !(
        m.type.toLowerCase().includes(searchText.toLowerCase()) ||
        m.donator.toLowerCase().includes(searchText.toLowerCase())
      );
      if (m.hide === true) {
        m.hideBubble = true;
      }
    });
    this.setState({ memorials: memorials });
  };

  iconClickHandler = (guid) => {
    const memorials = [...this.state.memorials];
    memorials.map((m) => {
      m.hideBubble = true;
      if (guid === m.guid) {
        // Replace with GUID
        m.hideBubble = false;
      }
    });
    this.setState({ memorials: memorials });
  };

  bubbleCloseClickHandler = () => {
    const memorials = [...this.state.memorials];
    memorials.map((m) => {
      m.hideBubble = true;
    });
    this.setState({ memorials: memorials });
  };

  render() {
    const content = this.state.error ? (
      <div className="error">
        <p>Error: {this.state.error.message}</p>
        <br />
        <p>Do you have the API runnning?</p>
      </div>
    ) : !this.state.isLoaded ? (
      <h1 className="loadingMessage">Loading...</h1>
    ) : (
      <div className="App">
        <Map
          memorials={this.state.memorials}
          currentLocation={this.state.currentLocation}
          iconClicked={this.iconClickHandler}
          bubbleCloseClick={this.bubbleCloseClickHandler}
        />
        <Sidebar
          memorials={this.state.memorials}
          searchHandler={this.searchHandler}
        />
      </div>
    );
    return content;
  }
}

export default App;
