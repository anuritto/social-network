import React from 'react';
import {NavLink} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import styles from './Dialogs.module.css'
const Messages = (props) =>{
    //debugger;
    return <>
        <NavLink to={'/dialogs'}>{'<- All dialogs'}</NavLink>
        {
            props.messages.items.map(item =>{
                return <div key={item.id}>
                    {item.senderName}: {item.body}
                </div>
            })

        }
        <div className={styles.newmessage}>
            <form onSubmit={props.handleSubmit}>
            <Field name={'messageBody'} component='input' type='text'/>
            <button>Send</button>
            </form>
        </div>
        </>
}

export default reduxForm({form:'newmessage'})(Messages)