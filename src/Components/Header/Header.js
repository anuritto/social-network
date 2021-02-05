import React from 'react'
import styles from './../../App.module.css'
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import {logOut} from "../../Redux/authReducer";

const imgurl = "https://www.veeam.com/content/dam/veeam/global/veeam-graphics/veeam_logo_white-500.png.web.1280.1280.png?ck=1572622163865&ck=1572622163865"

const Header = (props) =>{
    return <div className={styles.header}>
        <div className={styles.headerlogo}><img src={imgurl} alt=""/></div>
        <div className={styles.headerright}>
            {
                props.isAuth? <div>{props.login} - <span onClick={props.logOut}>log out</span></div>
                    : <NavLink to="/login">Log in</NavLink>
            }
        </div>

    </div>
}

const mapStateToProps = (state) =>{
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}

const HeaderContainer = connect(mapStateToProps,{logOut})(Header);
export default  HeaderContainer;