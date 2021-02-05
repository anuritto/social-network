import React from 'react'
import styles from './../../App.module.css'
import {NavLink} from "react-router-dom";


export const Nav = () =>{
    return <div className={styles.nav}>
        <div><NavLink to='/profile'>Profile</NavLink></div>
        <div><NavLink to='/dialogs'>Dialogs</NavLink></div>
        <div><NavLink to=''></NavLink></div>
        <div><NavLink to=''></NavLink></div>
        <div><NavLink to=''></NavLink></div>

    </div>
}