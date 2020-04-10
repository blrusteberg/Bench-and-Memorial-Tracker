import React from "react";

import Item from "./Item/Item";

const navigationPanel = () => {
  return (
    <div>
      <Item label="Memorials" />
      <Item label="Memorial Types" />
      <Item label="Accounts" />
      <Item label="Settings" />
    </div>
  );
};

export default navigationPanel;
