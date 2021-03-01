import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import styles from './Dialogs.module.css'
const Messages = (props) =>{
    let lastMessage = null;
    return <>
        <NavLink to={'/dialogs'}><div className={styles.back+' valign-wrapper'}><i className="material-icons">arrow_back</i></div></NavLink>
        {props.messages.items.length== 0?
            <div className={'center-align'}>your messages will be here</div>: <>

        {
            props.messages.items.map(item =>{
                if(item.senderId!=lastMessage){
                    lastMessage = item.senderId;
                    return <div key={item.id} className={styles.message}>
                        <div className={styles.messageName}>{item.senderName}:</div> <span className={styles.messageBody}>{item.body}</span>
                    </div>
                }
                else return <div key={item.id} className={styles.message}>
                    <span className={styles.messageBody}>{item.body}</span>
                </div>
            })

        }</>}
        <div className={styles.newmessage}>
            <form onSubmit={props.handleSubmit} className={styles.sendform}>
            <div className={styles.sendinput}><Field name={'messageBody'} component='input' type='text'/></div>
            <div className={styles.sendbutton}><button class="btn-small waves-effect cyan lighten-2">
                {/*<i className="material-icons right">send</i>*/}
                send
            </button></div>
            </form>
        </div>
        </>
}

export default reduxForm({form:'newmessage'})(Messages)