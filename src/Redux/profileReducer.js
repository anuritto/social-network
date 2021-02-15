
// action creators
import {porfileAPI as profileAPI} from "../API/API";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'APP/SET_IS_INITIALIZE_APP';
const setProfileUserData = (profile)=> ({type:SET_USER_DATA, profile})



// REDUCER
const profileReducer = (state= initialState , action) => {

    switch (action.type) {
        case SET_USER_DATA: {

            return {...state, profile: action.profile}
        }
        default:
            return {...state}
    }
};

export const getProfileUserData = (userId) => async (dispatch) => {
    let response = await profileAPI.getProfile(userId);
    dispatch(setProfileUserData(response.data))
};
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