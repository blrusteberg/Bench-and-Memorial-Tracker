import React from "react";
import Memorial from "./Memorial/Memorial";
import styles from "./Sidebar.module.css";

const sidebar = (props) => {
  return (
    <div className={styles.Sidebar}>
      <input
        onChange={(event) => props.searchHandler(event.target.value)}
        className={styles.SearchInput}
        type="text"
        placeholder="What are you looking for?"
      />
      <div className={styles.ScrollMenu}>
        {props.memorials.map((m) => {
          return (
            <Memorial
              key={m.guid}
              attributes={m.attributes}
              type={m.type}
              hide={m.hideIcon}
            />
          );
        })}
      </div>
    </div>
  );
};

export default sidebar;
