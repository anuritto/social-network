import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {getProfileUserData} from "../../Redux/profileReducer";
import {ProfileInfo} from "./ProfileInfo";
import {Loading} from "../Common/Loading";



class Profile extends React.Component{
    refreshProfileUserData(){
        let userID;
        userID = this.props.match.params.userID;
        if (!userID){
            userID = this.props.authID;
        }
        debugger;
        this.props.getProfileUserData(userID);

    }
    componentDidMount() {
        debugger;
        this.refreshProfileUserData();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props!=prevProps){
            this.refreshProfileUserData();
        }
    }


    render(){

        if(!this.props.profile){
            return <Loading/>
        }
        else return <div>
            <ProfileInfo profile={this.props.profile}/>
        </div>
    }
};
const mapStateToProps = (state) =>{

    return {
        authID:state.auth.userID,
        profile: state.profile.profile
    }
}

const ProfileContainer = compose(connect(mapStateToProps,{getProfileUserData}))(Profile)

export default ProfileContainer;