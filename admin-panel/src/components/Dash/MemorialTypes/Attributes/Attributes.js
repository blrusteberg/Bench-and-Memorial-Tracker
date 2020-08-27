import React from "react";
import styles from "./Attributes.module.css";
import { Button, FormControl} from 'react-bootstrap';

const attributes = (props) => {
  return (
    <label>
        {props.attributes.map((item, n) => (item.name === 'longitude' || item.name === 'latitude') ?
            <div className={styles.container}>
                <FormControl readOnly type="text" key={item.name} value={item.name}/>
            </div>
            :
            <div className={styles.container}>
                <FormControl type="text" key={n} value={item.name} onChange={event => props.updateAttribute(event.target.value, n)}/>
                <Button variant="primary" onClick={() => props.deleteAttribute(n)}>DELETE</Button>
                <select id={item.name} value={item.dataType}>
                  <option value="date">Date</option>
                  <option value="number">Number</option>
                  <option value="true/false">True/False</option>
                  <option value="words">Words</option>
                </select>
                <h1>YES</h1>
                <input
                    type="checkbox"
                    checked={item.required===true}
                    value="Yes"
                />
                <h1>NO</h1>
                <input
                    type="checkbox"
                    checked={item.required===false}
                    value="No"
                />
            </div>
        )}
    </label>
  );
};

export default attributes;