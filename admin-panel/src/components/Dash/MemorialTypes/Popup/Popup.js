import React from 'react';  
import styles from "./Popup.module.css";
import closeWindow from "../../../../assets/closeWindow.png"

class Popup extends React.Component {  
    render() {  
        return (  
            <div className={styles.popup}>  
                <div className={styles.popup_inner}>  
                    <img className={styles.closeWindow} src={closeWindow} onClick={this.props.closePopup}></img>
                    <br />
                    <br />
                    <h1>
                        You are about to update {this.props.updatedAttributes} attributes, delete {this.props.deletedAttributes} attributes, 
                        and add {this.props.addedAttributes} new attributes.
                    </h1>  
                    <br />
                    <h2>Do you want to continue?</h2>
                    <button onClick={this.props.saveAttributes}>Continue</button> 
                </div>  
            </div>  
        );  
    }  
}  

export default Popup;