import React from 'react'
import styles from './../../App.module.css'
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import {logOut} from "../../Redux/authReducer";
import 'materialize-css';

const imgurl = "https://www.veeam.com/content/dam/veeam/global/veeam-graphics/veeam_logo_white-500.png.web.1280.1280.png?ck=1572622163865&ck=1572622163865"

const Header = (props) => {
    return <>
        {/*<div className={styles.headerback}>

        </div>
        <div className={styles.header}>

            <div className={styles.headerlogo}><img src={imgurl} alt=""/></div>
            <div className={styles.headerright}>
                {
                    props.isAuth ? <div>{props.login} - <span onClick={props.logOut}>log out</span></div>
                        : <NavLink to="/login">Log in</NavLink>
                }
            </div>

        </div>*/}

        <div className={"navbar-fixed"}>
            <nav className={"cyan lighten-3"}>
                <div className={"container"}>
                    <div className={"nav-wrapper"}>
                        <h5  className={"left"}>Social Network</h5>
                        <ul className={"right hide-on-med-and-down"}>
                            {
                                props.isAuth ? <><li><span>{props.login}</span></li><li><div onClick={props.logOut}>log out</div></li></>
                                //props.isAuth ? <><li><span>{props.login}</span></li><li><div onClick={()=>alert('sdsd')}>alert</div></li></>
                                    : <li><NavLink to="/login">Log in</NavLink></li>
                            }
                            {/*<li><a href="#">Sass</a></li>
                            <li><a href="#">Components</a></li>*/}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    </>
}

const mapStateToProps = (state) =>{
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}

const HeaderContainer = connect(mapStateToProps,{logOut})(Header);
export default  HeaderContainer;