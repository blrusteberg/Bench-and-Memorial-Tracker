import React from "react";
import styles from "./Attributes.module.css";

const attributes = (props) => {
  return (
    <div>
      <div className={styles.container}>
        <span className={styles.firstLabel}>Property</span>
        <span className={styles.secondLabel}>Type</span>
        <span className={styles.thirdLabel}>Allow Empty</span>
      </div>
        {props.attributes.map((item, n) => (item.name === 'longitude' || item.name === 'latitude') ?
            <div className={styles.container}>
                <input readOnly type="text" disabled="disabled" key={item.name} value={item.name}/>
                <input readOnly type="text" disabled="disabled" value="Number"/>
                <input type="checkbox" disabled="disabled" checked="checked"/>
            </div>
            :
            <div className={styles.container}>
                <input type="text" key={n} value={item.name} onChange={event => props.updateAttribute(event.target, n)}/>
                <select value={item.dataType} onChange={event => props.updateAttribute(event.target, n)}>
                  <option value="date">Date</option>
                  <option value="number">Number</option>
                  <option value="boolean">True/False</option>
                  <option value="string">Words</option>
                </select>
                <input
                    type="checkbox"
                    checked={item.required}
                    value={item.required}
                    onChange={event => props.updateAttribute(event.target, n)}
                />
                <button onClick={() => props.deleteAttribute(n)}>DELETE</button>
            </div>
        )}
      <button onClick={() => props.addAttribute()}>
        Add Attribute
      </button>
      <br />
      <button onClick={() => props.saveAttributes()}>
        Save
      </button> 
    </div>
  );
};

export default attributes;