import {authAPI} from "../API/authAPI";
import {stopSubmit} from "redux-form";


// action creators
const SET_USER_DATA = 'AUTH/SET_USER_DATA';
const DELETE_USER_DATA = 'AUTH/DELETE_USER_DATA';
const setUserData = (email,login,userID) => ({type: SET_USER_DATA, payload:{email,login,userID}});
const deleteUserData = () => ({type: DELETE_USER_DATA});

// REDUCER
const authReducer = (state = initialState, action) =>{
switch (action.type){
    case SET_USER_DATA:{
        return {...state,...action.payload, isAuth: true}
    }
    case DELETE_USER_DATA:{
        return {...state,isAuth: false,
            userID: null,
            login: null,
            email: null,
            capthaURL: null}
    }
    default: return {...state}
}
};


// Санки
export const getUserData = ()=> async (dispatch)=>{
    const response = await authAPI.me();
    if(response.data.resultCode===0){
        const {email,login,id} = response.data.data;
        dispatch(setUserData(email,login,id));
    }
}
export const logIn = (email,password,rememberMe,captcha) => async (dispatch) =>{
    const response = await authAPI.logIn(email,password,rememberMe,captcha);
    debugger;
    if(response.data.resultCode===0){
        dispatch(getUserData());
    }
    else {
        if (response.data.resultCode === 10) {}
        const message = response.data.messages.length >0 ?response.data.messages[0] : "some error";
        dispatch(stopSubmit('login',{_error:message}));
    }
};
export const logOut = () => async (dispatch) =>{
    debugger;
    const response = await authAPI.logOut();
    if(response.data.resultCode===0){
dispatch(deleteUserData());
    }
}

const initialState = {
    isAuth: false,
    userID: null,
    login: null,
    email: null,
    capthaURL: null,
};
export default authReducer;