import React from 'react';
import {NavLink} from "react-router-dom";
import style from './users.module.css'

const nullPhoto = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'

export const User = (props) => {
    return <div className={style.userdiv} >
        <div>
            <div className={style.avatar}>
                <NavLink to={`/profile/` + props.id}>
                    <img src={props.photo ? props.photo : nullPhoto} alt=""/>
                </NavLink>
            </div>
            <div className={style.username}>Name: {props.name}</div>
        </div>

        <div>s</div>
        <div><i>status: {props.status}</i></div>
        {props.followed ?
            <button disabled={props.followingUsers.some(id=>id==props.id)} onClick={()=>props.unFollowUser(props.id)}>Unfollow</button>
            :
            <button disabled={props.followingUsers.some(id=>id==props.id)} onClick={()=>props.followUser(props.id)}>Follow</button>}

        <hr/>
    </div>
}