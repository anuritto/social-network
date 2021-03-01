import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {Field, reduxForm} from "redux-form";
import {compose} from "redux";
import withAuthRedirect from "../Common/withAuthRedirect";
import {logIn, logOut} from "../../Redux/authReducer";
import {CreateField} from "../Common/formControl";
import style from './login.module.css'
import {testLogin, testPassword} from "../../testAccount/passlog";


const Login = (props) =>{
    const onSubmit = (formData)=>{
        const {email,password,rememberMe,captcha} = formData;
        debugger;
        props.logIn(email,password,rememberMe,captcha);
    }
    if(props.isAuth==true){
        return <Redirect to='/profile'/>
    }
    else return <div className={style.wrapper}>
<div className={style.loginform}>
    <h5>Account log in</h5>
    <LoginFormRedux onSubmit={onSubmit}/></div>
<div className={style.testacc} >
    <h5>Test account data:</h5>
    <p><span>Login:</span> <span className={style.test}>{testLogin}</span></p>
    <p><span>Password:</span> <span className={style.test}>{testPassword}</span></p>
    <div className={style.please}>Please, observe well-mannered communication :) </div>
</div>

    </div>
};
const LoginForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div><Field placeholder='your email' type="text" component='input' name='email'/></div>
        <div><Field placeholder='your password' type="password" component='input' name='password'/></div>
        {/*<div>Remember you?<Field placeholder='remember you/' type="checkbox" component='input' name='rememberMe'/></div>*/}
        <div className="switch">
            <label>
                Remember you?
                {CreateField('input','rememberMe',null,[],{type:"checkbox"})}

                <span className="lever"></span>
                Yes
            </label>
        </div>
        {props.error && <div>wrong e-mail/login</div>}
        <button className="waves-effect cyan lighten-1 btn" >Log In</button>

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