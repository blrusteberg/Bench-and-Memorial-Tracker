import React from "react";
import styles from "./App.module.css";
import SidePanel from "../components/SidePanel/SidePanel";
import Dash from "../components/Dash/Dash";

function App() {
  return (
    <div className={styles.App}>
      <SidePanel />
      <Dash />
    </div>
  );
}

export default App;
