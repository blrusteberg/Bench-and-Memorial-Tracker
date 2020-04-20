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
            </div>
        )}
    </label>
  );
};

export default attributes;