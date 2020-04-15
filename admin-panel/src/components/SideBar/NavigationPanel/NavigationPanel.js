import React from "react";

const navigationPanel = (props) => {
  return (
    <div>
      <ul onClick={props.handleNavigationClick}>
        <li>
          <div id="Accounts">Accounts</div>
        </li>
        <li>
          <div id="Memorials">Memorials</div>
        </li>
        <li>
          <div id="Memorial Types">Memorial Types</div>
        </li>
        <li>
          <div id="Settings">Settings </div>
        </li>
      </ul>
    </div>
  );
};

export default navigationPanel;
