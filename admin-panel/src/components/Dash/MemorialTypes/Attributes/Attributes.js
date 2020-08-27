import React from "react";
import styles from "./Attributes.module.css";

const attributes = (props) => {
  return (
    <label>
        {props.attributes.map((item, n) => (item.name === 'longitude' || item.name === 'latitude') ?
            <div className={styles.container}>
                <input readOnly type="text" key={item.name} value={item.name}/>
            </div>
            :
            <div className={styles.container}>
                <input type="text" key={n} value={item.name} onChange={event => props.updateAttribute(event.target.value, n, "NAME")}/>
                <select value={item.dataType} onChange={event => props.updateAttribute(event.target.value, n, "DATATYPE")}>
                  <option value="date">Date</option>
                  <option value="number">Number</option>
                  <option value="boolean">True/False</option>
                  <option value="string">Words</option>
                </select>
                <div>YES</div>
                <input
                    type="checkbox"
                    checked={item.required===true}
                    value={true}
                    onChange={event => props.updateAttribute(event.target.value, n, "REQUIRED")}
                />
                <div>NO</div>
                <input
                    type="checkbox"
                    checked={item.required===false}
                    value={false}
                    onChange={event => props.updateAttribute(event.target.value, n, "REQUIRED")}
                />
                <button variant="primary" onClick={() => props.deleteAttribute(n)}>DELETE</button>
            </div>
        )}
    </label>
  );
};

export default attributes;