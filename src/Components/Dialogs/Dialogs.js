import React from 'react';
import styles from './Dialogs.module.css'
import {nullPhoto} from "../Common/CommonFiles";
import {NavLink} from "react-router-dom";

export const Dialogs = ({listOfDialogs}) => {
    //debugger;
    if (listOfDialogs.length == 0) {
        return <div>0 dialogs, start chatting now!</div>
    } else return <div className={styles.dialogsPage}>
            {listOfDialogs.map(dialog => {
                return <>

                        <div key={dialog.id} className={styles.dialogItem}>
                            <div className={styles.dialogItemImg}>
                                <NavLink to={`/profile/${dialog.id}`}>
                                <img src={dialog.photos.small ? dialog.photos.small : nullPhoto} alt=""/>
                                </NavLink>
                            </div>
                            <div className={styles.dialogItemName}>
                                <NavLink to={`/dialogs/${dialog.id}`}>
                                    {dialog.userName}
                                </NavLink>

                            </div>
                        </div>

                </>
            })}
    </div>
}