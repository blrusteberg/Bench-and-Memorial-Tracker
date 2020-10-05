import React from "react";

import Accounts from "./Accounts/Accounts";
import Memorials from "./Memorials/Memorials";
import MemorialTypes from "./MemorialTypes/MemorialTypes";
import Attributes from "./Attributes/Attributes";
import TaggerForm from "./TaggerForm/TaggerForm";

import styles from "./Dash.module.css";

class Dash extends React.Component {
  state = {
    sideBarOpenClick: false,
  };

  changeDashView = () => {
    switch (this.props.page) {
      case "Accounts":
        return <Accounts />;

      case "Memorials":
        return <Memorials />;

      case "Memorial Types":
        return <MemorialTypes />;

      case "Attributes":
        return <Attributes />;

      case "Tagger Form":
        return <TaggerForm />;

      default:
        return <Accounts />;
    }
  };

  render() {
    return (
      <div className={styles.Dash}>
        {this.changeDashView()}

        {this.props.sideBarCollapse ? (
          <button
            className={styles.openSidePanel}
            onClick={this.props.sideBarCollapseHandler}
          >
            <img
              src="./images/arrowRight.png"
              alt="arrow-right"
              className={"arrowRight"}
            ></img>
          </button>
        ) : null}
      </div>
    );
  }
}
export default Dash;
