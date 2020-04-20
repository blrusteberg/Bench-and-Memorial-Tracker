import React from "react";
import styles from "./Dropdown.module.css";
import { FormControl} from 'react-bootstrap';

const dropdown = (props) => {
  return (
    <div>
        <label>Memorial Types</label>
        <FormControl as="select" onChange={event => props.dropdownChange(event)}>
            {(Object.values(props.types)).map((list, n) => (
                <option key={list.name} value={n}>
                    {list.name}
                </option>
            ))}
        </FormControl>
    </div>
  );
};

export default dropdown;