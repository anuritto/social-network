import {usersAPI} from "../API/API";
import {filerMassivOfObjects} from "../Components/Common/helpers";


const SET_USERS = 'USERS/SET_USERS';
const FOLLOW = 'USERS/FOLLOW'
const UNFOLLOW = 'USERS/UNFOLLOW'
const ADD_TO_FOLLOWING_LIST = 'USERS/ADD_TO_FOLLOWING_LIST'
const REMOVE_FROM_FOLLOWING_LIST = 'USERS/REMOVE_FROM_FOLLOWING_LIST'
const SET_CURRENT_PAGE = 'USERS/SET_CURRENT_PAGE'
const follow = (userId)=>({type:FOLLOW,userId});
const unFollow = (userId)=>({type:UNFOLLOW,userId});
const setUsers = (users,totalCount) => ({type: SET_USERS, users,totalCount});
const addToFollowingList = (userId) => ({type: ADD_TO_FOLLOWING_LIST, userId})
const removeFromFollowingList = (userId) => ({type: REMOVE_FROM_FOLLOWING_LIST, userId})
export const setCurrentPage = (page) =>({type: SET_CURRENT_PAGE, page});



const usersReducer = (state = initialState,action) => {
    switch (action.type) {
        case SET_USERS: {
            return {...state, users: action.users, totalCount:action.totalCount}
        }
        case SET_CURRENT_PAGE:{
            return {...state,currentPage:action.page}
        }
        case FOLLOW:{
            return {...state,
                users: filerMassivOfObjects(state.users,"id",action.userId,{followed:true})
            }
        }
        case UNFOLLOW:{
            return {...state,
                users: filerMassivOfObjects(state.users,"id",action.userId,{followed:false})
            }
        }
        case ADD_TO_FOLLOWING_LIST:{
            return {...state,
                followingUsers: [...state.followingUsers,action.userId]
            }
        }
        case REMOVE_FROM_FOLLOWING_LIST:{
            return {...state,
                followingUsers: state.followingUsers.filter(id=>id!=action.userId)
            }
        }
        default:
            return {...state}
    }
}

export const getUsers = (page, count) => async (dispatch) => {
    let response = await usersAPI.getUsers(page, count);
    dispatch(setUsers(response.data.items,response.data.totalCount));
}
export const followUser = (userId) => (dispatch) => {

    dispatch(addToFollowingList(userId));

    usersAPI.getFollow(userId).then(()=>{
        dispatch(removeFromFollowingList(userId));
        dispatch(follow(userId));
    })
}
export const unFollowUser = (userId) => (dispatch) => {
    dispatch(addToFollowingList(userId));
    usersAPI.getUnFollow(userId).then(()=>{
        dispatch(removeFromFollowingList(userId));
        dispatch(unFollow(userId));
    })
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
    totalCount: null,
    followingUsers: []
}
export default usersReducer;