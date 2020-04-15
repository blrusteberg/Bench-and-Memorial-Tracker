import React from "react";

import NavigationPanel from "./NavigationPanel/NavigationPanel";

const sidepanel = (props) => {
  return (
    <div>
      <p>Welcome back Johnny</p>
      <img src="./images/user-avatar.png" />
      <NavigationPanel handleNavigationClick={props.handleNavigationClick} />
    </div>
  );
};

export default sidepanel;
