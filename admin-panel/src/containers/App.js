import React from "react";

import styles from "./App.module.css";
import SideBar from "../components/SideBar/SideBar";

import Dash from "../components/Dash/Dash";

import { Router, Switch, Route, BrowserRouter } from 'react-router-dom';
import Accounts from "../components/Dash/Accounts/Accounts";
import Memorials from "../components/Dash/Memorials/Memorials";
import MemorialTypes from "../components/Dash/MemorialTypes/MemorialTypes";
import TaggerForm from "../components/Dash/TaggerForm/TaggerForm";

class App extends React.Component {
  state = {
    page: "Memorials",
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

  render() {
    return (
      <div className={styles.App}>
      <BrowserRouter>
        <SideBar handleNavigationClick={this.handleNavigationClick} />
       
          {/* <Dash page={this.state.page} /> */}
          <Switch>
            <Route exact path='/' component={Accounts} />
            <Route exact path='/taggerForm' component={TaggerForm} />
            <Route exact path='/memorials' component={Memorials} />
            <Route exact path='/memorialTypes' component={MemorialTypes} />
            {/* <Route exact path='/attributes' component={Attributes} /> */}
          </Switch>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
