import {usersAPI} from "../API/API";


const SET_USERS = 'USERS/SET_USERS';
const SET_CURRENT_PAGE = 'USERS/SET_CURRENT_PAGE'
const setUsers = (users,totalCount) => ({type: SET_USERS, users,totalCount});
export const setCurrentPage = (page) =>({type: SET_CURRENT_PAGE, page})



const usersReducer = (state = initialState,action) => {
    switch (action.type) {
        case SET_USERS: {
            return {...state, users: action.users, totalCount:action.totalCount}
        }
        case SET_CURRENT_PAGE:{
            return {...state,currentPage:action.page}
        }
        default:
            return {...state}
    }
}

export const getUsers = (page, count) => async (dispatch) => {
    let response = await usersAPI.getUsers(page, count);
    debugger;
    dispatch(setUsers(response.data.items,response.data.totalCount));
}
/*export const setPage = (page) => async (dispatch) =>{
    let response = await usersAPI.getUsers(page);
    debugger
    dispatch()
}*/

const initialState = {
    users: [],
    pageSize: 10,
    currentPage: 1,
    totalCount: null
}
export default usersReducer;