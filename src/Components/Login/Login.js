import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {Field, reduxForm} from "redux-form";
import {compose} from "redux";
import withAuthRedirect from "../Common/withAuthRedirect";
import {logIn, logOut} from "../../Redux/authReducer";


const Login = (props) =>{
    const onSubmit = (formData)=>{
        const {email,password,rememberMe,captcha} = formData;
        debugger;
        props.logIn(email,password,rememberMe,captcha);
    }
    if(props.isAuth==true){
        return <Redirect to='/profile'/>
    }
    else return <>
        login s
        <LoginFormRedux onSubmit={onSubmit}/>
    </>
};
const LoginForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div><Field placeholder='your email' type="text" component='input' name='email'/></div>
        <div><Field placeholder='your password' type="password" component='input' name='password'/></div>
        <div>Remember you?<Field placeholder='remember you/' type="checkbox" component='input' name='rememberMe'/></div>
        {props.error && <div>wrong e-mail/login</div>}
        <button>Log in</button>

    </form>
}
const LoginFormRedux = reduxForm({form:'login'})(LoginForm)

const mapStateToProps = (state)=>{
    return {
        isAuth: state.auth.isAuth
    }
};
const LoginContainer = compose(connect(mapStateToProps,{logIn}))(Login);
export default LoginContainer;