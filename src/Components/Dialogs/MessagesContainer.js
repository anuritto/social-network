import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {cleanMessages, getMessages, sendMessage, startDialog} from "../../Redux/dialogsReducer";
import Messages from "./Messages";
import {Loading} from "../Common/Loading";


const MessagesContainer = (props) =>{

    let [id,setId] = useState(props.match.params.userID);
    useEffect(()=>{
        props.getMessages(id);
        //props.startDialog(id) так и не понял смысла апи
        return function () {
props.cleanMessages();
        }
    },[props.match.params.userID])
    let sendMessage = (formData)=>{
        props.sendMessage(id,formData.messageBody);
    }
    if(!props.messages){
        return <Loading/>
    }
    else return <Messages onSubmit={sendMessage} messages={props.messages}/>
}
let mapStateToProps=(state)=>{
    return {
        messages: state.dialogs.messages
    }
}
export default connect(mapStateToProps,{cleanMessages,getMessages,sendMessage,startDialog})(MessagesContainer);