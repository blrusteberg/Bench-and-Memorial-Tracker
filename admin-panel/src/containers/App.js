import React from "react";
import styles from "./App.module.css";
import SideBar from "../components/SideBar/SideBar";
import Dash from "../components/Dash/Dash";

function App() {
  handleNavigationClick = (e) => {
    const page = e.target.id;
    if (page) {
      this.props.onClick(page);
    }
  };
  return (
    <div className={styles.App}>
      <SideBar handleNavigationClick={handleNavigationClick} />
      <Dash />
    </div>
  );
}

export default App;
