import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {getMessages, sendMessage, startDialog} from "../../Redux/dialogsReducer";
import Messages from "./Messages";
import {Loading} from "../Common/Loading";


const MessagesContainer = (props) =>{
    debugger;
    let [id,setId] = useState(props.match.params.userID);
    useEffect(()=>{
        props.getMessages(id);
        //props.startDialog(id) так и не понял смысла апи
    },[props.match.params.userID])
    let sendMessage = (formData)=>{
        debugger;
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
export default connect(mapStateToProps,{getMessages,sendMessage,startDialog})(MessagesContainer);