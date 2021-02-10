import {reset} from 'redux-form';
// action creators
import {dialogsAPI} from "../API/API";

const SET_LIST_OF_DIALOGS = 'DIALOGS/SET_LIST_OF_DIALOGS';
const SET_MESSAGES = 'DIALOGS/SET_MESSAGES';

const setListOfDialogs= (list)=> ({type:SET_LIST_OF_DIALOGS,list});
const setMessagesWith = (messages) => ({type: SET_MESSAGES,messages});



// REDUCER
const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_LIST_OF_DIALOGS: {
            return {...state, listOfDialogs:action.list}
        }
        case SET_MESSAGES:{
            return {...state, messages: action.messages}
        }
        default:
            return {...state}
    }
};


// инициализация приложения
export const getListOfDialogs = () => async (dispatch)=>{
    let response = await dialogsAPI.getAllDialogs();
    dispatch(setListOfDialogs(response.data));
}
export const sendMessage = (userId,message) =>async (dispatch)=> {
    let response = await dialogsAPI.sendMessage(userId,message);
    debugger;
    dispatch(getMessages(userId));
    dispatch(reset('newmessage'))
}
export const getMessages = (userId) => async (dispatch) =>{
    let response = await dialogsAPI.getMessagesWith(userId);
    //debugger;
    dispatch(setMessagesWith(response.data))
}
//no touch
const initialState = {
    listOfDialogs: null
};
export default dialogsReducer;