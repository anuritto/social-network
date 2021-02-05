import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";


const withAuthRedirect = (Component) => {
    debugger;

    const redirectComponent = (props) => {
        if(props.isAuth == false){
            return <Redirect to='/login'/>
        }
        else return <Component {...props}/>
    };
    const mapStateToProps = (state) =>{
        return {
            isAuth: state.auth.isAuth
        }
    }
    const connectRedirectComponent = connect(mapStateToProps,{})(redirectComponent);
    return connectRedirectComponent;

};
export default withAuthRedirect;