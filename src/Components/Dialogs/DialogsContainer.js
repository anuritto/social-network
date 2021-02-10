import React from 'react';
import {connect} from "react-redux";
import {getListOfDialogs, getMessages, sendMessage} from "../../Redux/dialogsReducer";
import {Dialogs} from "./Dialogs";
import {Loading} from "../Common/Loading";
import * as queryString from "query-string";



class DialogsContainer extends React.Component{
    componentDidMount() {
        this.props.getListOfDialogs();
        //this.props.sendMessage(14007,'test automatic message');
        this.refreshDialogData();
        let currentDialogID = this.props.match.params.userID;


    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.match.params.userID!=prevProps.match.params.userID) {
            debugger;
            this.refreshDialogData();
        }
    }
    refreshDialogData(){
        let params = queryString.parse(this.props.location.search);
        if(params.pm){
            this.props.getMessages(params.pm);
        }
    }

    render(){
        if(!this.props.listOfDialogs){
            return <Loading/>

        }
        else return <div>
            <Dialogs listOfDialogs={this.props.listOfDialogs}/>
        </div>
    }
};
let mapStateToProps=(state)=>{
    return {
        listOfDialogs: state.dialogs.listOfDialogs,
        messages: state.dialogs.messages
    }
}
export default connect(mapStateToProps,{getListOfDialogs,getMessages,sendMessage})(DialogsContainer);