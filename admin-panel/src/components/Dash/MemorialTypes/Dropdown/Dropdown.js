import React from "react";
import styles from "./Dropdown.module.css";

const dropdown = (props) => {
  return (
    <label>
        Pick a type:
        <select onChange={event => props.dropdownChange(event)}>
            {(Object.values(props.types)).map((list, n) => (
                <option key={list.name} value={n}>
                    {list.name}
                </option>
            ))}
        </select>
    </label>
  );
};

export default dropdown;