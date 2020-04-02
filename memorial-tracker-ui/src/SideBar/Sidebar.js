import React from "react";
import Memorial from "../Memorial/Memorial";

const Sidebar = props => {
  return (
    <div className="SideBar">
      <input
        className="SearchInput"
        type="text"
        placeholder="What are you looking for?"
      />
      <div className="ScrollMenu">
        {props.memorials.map(m => {
          return <Memorial key={m.id} donator={m.donator} type={m.type} />;
        })}
      </div>
    </div>
  );
};

export default Sidebar;
