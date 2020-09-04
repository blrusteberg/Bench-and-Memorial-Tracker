import React from "react";
import styles from "./Attributes.module.css";
import addAttributeButton from "../../../../assets/addAttribute.png"
import deleteAttributeButton from "../../../../assets/deleteAttribute.png"

const attributes = (props) => {
  return (
    <div>
      <div>
        <span >Label</span>
        <span >Data Type</span>
        <span >Required</span>
      </div>
      <div>
        {props.attributes.map((item, n) => (item.name === 'longitude' || item.name === 'latitude') ?
            <div >
                <input readOnly type="text" disabled="disabled" key={item.name} value={item.name}/>
                <input readOnly type="text" disabled="disabled" value="Number"/>
                <input type="checkbox" disabled="disabled" checked="checked"/>
            </div>
            :
            <div >
                <input type="text" key={n} value={item.name} onChange={event => props.updateAttribute(event, n)}/>
                <select value={item.dataType} onChange={event => props.updateAttribute(event, n)}>
                  <option value="date">Date</option>
                  <option value="number">Number</option>
                  <option value="boolean">True/False</option>
                  <option value="string">Words</option>
                </select>
                <input
                    type="checkbox"
                    checked={item.required}
                    value={item.required}
                    onChange={event => props.updateAttribute(event, n)}
                />
                {/* <img className={styles.deleteAttributeButton} src={deleteAttributeButton} onClick={() => props.deleteAttribute(n)}></img> */}
            </div>
        )}
      </div>
      {/* <img className={styles.addAttributeButton} src={addAttributeButton} onClick={() => props.addAttribute()}></img> */}
      <label>Add attribute</label>
      <br />
      <button onClick={() => props.saveAttributes()}>
        Save
      </button> 
    </div>
  );
};

export default attributes;