import React from "react";

import styles from "./App.module.css";
import SideBar from "../components/SideBar/SideBar";
import Dash from "../components/Dash/Dash";

class App extends React.Component {
  state = {
    page: "Memorials",
    sideBarCollapse: false,
  };
  handleNavigationClick = (e) => {
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

  sideBarCollapseHandler = (collapse) => {
    this.setState({
      sideBarCollapse: collapse,
    });
  };

  render() {
    return (
      <div className={styles.App}>
        {this.state.sideBarCollapse ? null : (
          <SideBar
            handleNavigationClick={this.handleNavigationClick}
            sideBarCollapseHandler={() => this.sideBarCollapseHandler(true)}
          />
        )}
        <Dash
          page={this.state.page}
          sideBarCollapseHandler={() => this.sideBarCollapseHandler(false)}
          sideBarCollapse={this.state.sideBarCollapse}
        />
      </div>
    );
  }
}

export default App;
