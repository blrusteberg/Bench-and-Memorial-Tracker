import React from 'react';  
import styles from "./Popup.module.css";
import closeWindow from "../../../../../assets/closeWindow.png"

class Popup extends React.Component {  

    render() {  
        return (  
            <div className={styles.popup}>  
                <div className={styles.popup_inner}>  
                    <img className={styles.closeWindow} src={closeWindow} onClick={this.props.closePopup}></img>
                    <br />
                    <br />
                    <div className={styles.popup_innerText}>
                        {this.props.oldTypeName !== this.props.newTypeName && <div>You are about to change "{this.props.oldTypeName}" to "{this.props.newTypeName}"</div>}
                        {
                            this.props.deletedAttributeCount > 0 && 
                            <div>
                                You are about to delete [{" "}
                                    {Object.values(this.props.deletedAttributes).map(attribute => (
                                        attribute + " "
                                    ))} 
                                ] attributes from "{this.props.oldTypeName}"
                            </div>
                        } 
                        <br />
                        <div>Do you want to continue?</div>
                        <br />
                        <div className={styles.continueButtonWrapper}>
                            <button className={styles.continueButton} onClick={this.props.saveAttributes}>Continue</button> 
                        </div>
                    </div>
                </div>  
            </div>  
        );  
    }  
}  

export default Popup;