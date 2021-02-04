import {authAPI} from "../API/authAPI";


// action creators
const SET_USER_DATA = 'AUTH/SET_USER_DATA'
const setUserData = (email,login,userID) => ({type: SET_USER_DATA, payload:{email,login,userID}})

// REDUCER
const authReducer = (state = initialState, action) =>{
switch (action.type){
    case SET_USER_DATA:{
        return {...state,...action.payload, isAuth: true}
    }
    default: return {...state}
}
};


// Санки
export const getUserData = ()=> async (dispatch)=>{
    debugger;
    const response = await authAPI.me();
    if(response.data.resultCode===0){
        const {email,login,id} = response.data.data;
        dispatch(setUserData(email,login,id));
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