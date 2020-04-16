import React from "react";

import styles from "./App.module.css";
import SideBar from "../components/SideBar/SideBar";
import Dash from "../components/Dash/Dash";

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> Added some nav functionality
class App extends React.Component {
  state = {
    page: "Accounts",
  };
<<<<<<< HEAD
  handleNavigationClick = (e) => {
    console.log(e);
    const page = e.target.id;
    if (page) {
      this.changePage(page);
    }
  };

  changePage = (newPage) => {
    if (newPage !== this.state.page) {
      this.setState({
        page: newPage,
      });
    }
  };

  render() {
    return (
      <div className={styles.App}>
        <SideBar handleNavigationClick={this.handleNavigationClick} />
        <div className="Content">
          <Dash page={this.state.page} />
        </div>
      </div>
    );
  }
=======
function App() {
=======
>>>>>>> Added some nav functionality
  handleNavigationClick = (e) => {
    console.log(e);
    const page = e.target.id;
    if (page) {
      this.changePage(page);
    }
  };

  changePage = (newPage) => {
    if (newPage !== this.state.page) {
      this.setState({
        page: newPage,
      });
    }
  };
<<<<<<< HEAD
  return (
    <div className={styles.App}>
      <SideBar handleNavigationClick={handleNavigationClick} />
      <Dash />
    </div>
  );
>>>>>>> started nav bar
=======

  render() {
    return (
      <div className={styles.App}>
        <SideBar handleNavigationClick={this.handleNavigationClick} />
        <div className="Content">
          <Dash page={this.state.page} />
        </div>
      </div>
    );
  }
>>>>>>> Added some nav functionality
}

export default App;
