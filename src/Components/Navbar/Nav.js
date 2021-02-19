import React from 'react'
import styles from './../../App.module.css'
import {NavLink} from "react-router-dom";


export const Nav = () =>{
    /*return <div className={styles.nav}>
        <div><NavLink to='/profile'>Profile</NavLink></div>
        <div><NavLink to='/dialogs'>Dialogs</NavLink></div>
        <div><NavLink to='/users'>Users</NavLink></div>
        <div><NavLink to=''></NavLink></div>
        <div><NavLink to=''></NavLink></div>

    </div>*/
    return <div className={"sidebar"}>
        <ul>
            <li><NavLink to='/profile'>Profile</NavLink></li>
            <li><NavLink to='/users'>Users</NavLink></li>
            <li><NavLink to='/dialogs'>Dialogs</NavLink></li>
        </ul>
    </div>
}