import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {followUser, getUsers, setCurrentPage, unFollowUser} from "../../Redux/userReducer";
import {Loading} from "../Common/Loading";
import {User} from "./User";
import {SwitchPages} from "../Common/SwtichPages";

const Users = (props) =>{
    return <div>

        {props.users.map(key => {
            return <User name={key.name}
            id={key.id} status={key.status}
                         photo={key.photos.small}
                         followed={key.followed}
                         followUser={props.followUser}
                         unFollowUser={props.unFollowUser}
                         followingUsers={props.followingUsers}
            />
        })}
    </div>
}

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage,this.props.pageSize)
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.currentPage!=prevProps.currentPage){

            this.props.getUsers(this.props.currentPage,this.props.pageSize)
        }
    }

    render() {
        if (!this.props.users) {
            return <Loading/>
        } else return <>
            <SwitchPages totalItemsCount={this.props.totalCount} currentPage={this.props.currentPage}
                         pageSize={this.props.pageSize} onPageChanged={this.props.setCurrentPage}/>
            <Users users={this.props.users} unFollowUser={this.props.unFollowUser} followUser={this.props.followUser}
                   followingUsers={this.props.followingUsers}/>
        </>
    }
};
const mapStateToProps = (state)=>{
    return {
        users: state.users.users,
        totalCount: state.users.totalCount,
        pageSize: state.users.pageSize,
        currentPage: state.users.currentPage,
        followingUsers: state.users.followingUsers
    }
}
const exportUserContainer = compose(connect(mapStateToProps,{getUsers,setCurrentPage,followUser,unFollowUser}))(UsersContainer);

export default exportUserContainer;

