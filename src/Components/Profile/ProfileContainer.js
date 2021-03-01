import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {
    checkFollow, clearProfile,
    followUser,
    getProfileUserData,
    unFollowUser,
    updateProfileUserData
} from "../../Redux/profileReducer";
import {ProfileInfo} from "./ProfileInfo";
import {Loading} from "../Common/Loading";
import {withRedirectToLogin} from "../../HOC/withAuthRedirect";



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
        this.props.checkFollow(this.state.userID);

    }
    componentDidMount() {
        this.refreshProfileUserData();

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.match.params.userID!=prevProps.match.params.userID) {
            this.refreshProfileUserData();
        }
    }
    componentWillUnmount(){
        this.props.clearProfile();
    }



    render(){

        if(!this.props.profile){
            return <Loading/>
        }
        else return <div>
            <ProfileInfo profile={this.props.profile} isOwner={this.state.userID==this.props.authID}
            userID={this.state.userID} updateProfileUserData={this.props.updateProfileUserData} following={this.props.following}
                         followUser={this.props.followUser} unFollowUser={this.props.unFollowUser}/>
        </div>
    }
};
const mapStateToProps = (state) =>{

    return {
        authID:state.auth.userID,
        profile: state.profile.profile,
        following:state.profile.following
    };
}

const ProfileContainer = compose(withRedirectToLogin,connect(mapStateToProps,{clearProfile,getProfileUserData,updateProfileUserData,checkFollow,followUser,unFollowUser}))(Profile)

export default ProfileContainer;