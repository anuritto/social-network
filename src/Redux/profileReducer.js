
// action creators
import {porfileAPI as profileAPI} from "../API/API";

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
    debugger;
    let response = await profileAPI.getProfile(userId);
    dispatch(setProfileUserData(response.data))
}

const initialState = {
    profile: null,
}

export default profileReducer;