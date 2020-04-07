import React from "react";
import "./App.css";
import Map from "../components/Map/Map";
import Sidebar from "../components/SideBar/Sidebar";

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
    fetch("http://localhost:1337/api/memorials")
      .then((res) => res.json())
      .then(
        (result) => {
          result.memorials.map((m) => (m.hide = false));
          this.setState({
            memorials: result.memorials,
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
    let memorials = this.state.memorials;
    memorials.forEach((m) => {
      m.hide = !(
        m.type.toLowerCase().includes(searchText.toLowerCase()) ||
        m.donator.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    this.setState({ memorials: memorials });
  };

  iconClickHandler = (latitude, longitude) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    const win = window.open(url, "_blank");
    if (win != null) {
      win.focus();
    }
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
