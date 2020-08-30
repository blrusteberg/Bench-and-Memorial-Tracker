import React from "react";

import styles from "./App.module.css";
import SideBar from "../components/SideBar/SideBar";
import Dash from "../components/Dash/Dash";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  state = {
    page: "Accounts",
  };
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
}

export default App;
