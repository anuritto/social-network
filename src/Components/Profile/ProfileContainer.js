import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {getProfileUserData, updateProfileUserData} from "../../Redux/profileReducer";
import {ProfileInfo} from "./ProfileInfo";
import {Loading} from "../Common/Loading";



class Profile extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            userID:null
        }
    }
    refreshProfileUserData(){
        //let userID;
        //userID = this.props.match.params.userID;
        this.state.userID = this.props.match.params.userID;
        if (!this.state.userID){
            this.state.userID = this.props.authID;
        }
        this.props.getProfileUserData(this.state.userID);

    }
    componentDidMount() {
        this.refreshProfileUserData();

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.match.params.userID!=prevProps.match.params.userID) {
            debugger;
            this.refreshProfileUserData();
        }
    }


    render(){

        if(!this.props.profile){
            return <Loading/>
        }
        else return <div>
            <ProfileInfo profile={this.props.profile} isOwner={this.state.userID==this.props.authID}
            userID={this.state.userID} updateProfileUserData={this.props.updateProfileUserData}/>
        </div>
    }
};
const mapStateToProps = (state) =>{

    return {
        authID:state.auth.userID,
        profile: state.profile.profile
    }
}

const ProfileContainer = compose(connect(mapStateToProps,{getProfileUserData,updateProfileUserData}))(Profile)

export default ProfileContainer;