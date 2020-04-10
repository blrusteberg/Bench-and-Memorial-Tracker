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
            <Memorial key={m.id} donor={m.donor} type={m.type} hide={m.hide} />
          );
        })}
      </div>
    </div>
  );
};

export default sidebar;
