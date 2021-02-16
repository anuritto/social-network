
// action creators
import {porfileAPI as profileAPI} from "../API/API";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'USERS/SET_IS_INITIALIZE_APP';
const SET_FOLLOW_STATUS = 'USERS/SET_FOLLOW_STATUS'
const setProfileUserData = (profile)=> ({type:SET_USER_DATA, profile});
const setFollowStatus = (following)=>({type:SET_FOLLOW_STATUS,following})



// REDUCER
const profileReducer = (state= initialState , action) => {

    switch (action.type) {
        case SET_USER_DATA: {

            return {...state, profile: action.profile}
        }
        case SET_FOLLOW_STATUS:{
            return {...state, following:action.following}
        }
        default:
            return {...state}
    }
};
export const followUser=()=>async (dispatch,getState) =>{
    const userId = getState().profile.profile.userId;
    let response= await profileAPI.getFollow(userId);
    debugger;
    dispatch(setFollowStatus(true));
}
export const unFollowUser=()=>async (dispatch,getState) =>{
    const userId = getState().profile.profile.userId;
    debugger;
    let response= await profileAPI.getUnFollow(userId);
    debugger;
    dispatch(setFollowStatus(false));
}
export const getProfileUserData = (userId) => async (dispatch) => {
    let response = await profileAPI.getProfile(userId);

    dispatch(setProfileUserData(response.data))
};
export const checkFollow = (userId)=>async (dispatch) =>{
    let response = await profileAPI.getFollowStatus(userId);
    debugger;
    dispatch(setFollowStatus(response.data))

}
export const updateProfileUserData = (profile) => async (dispatch,getState) => {
    const userId = getState().auth.userID;
    let response = await profileAPI.updateProfile(profile);
    debugger;
    if (response.data.resultCode == 0){
        dispatch(getProfileUserData(userId));
        debugger;
    }
    else {
        dispatch(stopSubmit('profileEdit',{_error: response.data.messages}))
        return Promise.reject(response.data.messages)
    }

}

const initialState = {
    profile: null,
}

export default profileReducer;