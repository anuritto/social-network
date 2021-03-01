import React from 'react';
import {connect} from "react-redux";
import {Loading} from "../Components/Common/Loading";
import {Redirect} from "react-router-dom";

export const withRedirectToLogin = (Component) =>{
    class RedirectComponent extends React.Component{
        render() {
            if (!this.props.isAuth) return <Redirect to='/login'/>
            else return <Component {...this.props} />
        }
    }
    let mapStateToProps=(state)=>({
        isAuth: state.auth.isAuth
    })
    let RedirectComponentWithIsAuth = connect(mapStateToProps,{})(RedirectComponent);
    return RedirectComponentWithIsAuth;
}


