import React from "react";
import styles from "./Dropdown.module.css";
import { FormControl} from 'react-bootstrap';

const dropdown = (props) => {
  return (
    <div>
        <label>Memorial Types</label>
        <br />
        <select onChange={event => props.dropdownChange(event)}>
            <option key={"selectType"} value={"selectType"}>Select a type</option>
            {(Object.values(props.types)).map((list, n) => (
                <option key={list.name} value={n}>
                    {list.name}
                </option>
            ))}
        </select>
    </div>
  );
};

export default dropdown;