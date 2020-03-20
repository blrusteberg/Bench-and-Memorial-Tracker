import React from "react";

import Memorial from "./Memorial";
import styled from "@emotion/styled";

const Button = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
`;

const Sidebar = ({ memorialData }) => {
  return (
    <div className="sidebar">
      <div className="searchField">
        <input type="text" placeholder="Search for a memorial" />
        <Button>Search</Button>
      </div>
      <Memorial data={memorialData[0]} />
    </div>
  );
};

export default Sidebar;
