import React from "react";
import styles from "./Attributes.module.css";

const attributes = (props) => {
  return (
    <label>
        {props.attributes.map((item, n) => (item.name === 'longitude' || item.name === 'latitude') ?
            <div>
                <input type="text" key={item.name} value={item.name} readOnly='True'/>
            </div>
            :
            <div>
                <input type="text" key={n} value={item.name} onChange={event => props.updateAttribute(event.target.value, n)}/>
                <button onClick={() => props.deleteAttribute(n)}>DELETE</button>
            </div>
        )}
  </label>
  );
};

export default attributes;