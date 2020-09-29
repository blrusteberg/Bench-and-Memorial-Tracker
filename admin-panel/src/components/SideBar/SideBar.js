import React from "react";

import NavigationPanel from "./NavigationPanel/NavigationPanel";
import Dash from "../Dash/Dash";

import styles from "./SideBar.module.css";

class SideBar extends React.Component {
  state = {
    sideBarCloseClick: false,
    sideBarOpenClick: false,
  };

  render() {
    return (
      <div className={styles.SideBar}>
        <div>{this.props.accountType}</div>
        <button
          className={styles.hideNavButton}
          onClick={this.props.sideBarCollapseHandler}
        >
          <img src="./images/arrowLeft.png" alt="arrow-left"></img>
        </button>
        <NavigationPanel
          handleNavigationClick={this.props.handleNavigationClick}
        />
      </div>
    );
  }
}

export default SideBar;
