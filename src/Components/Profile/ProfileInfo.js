import React from 'react';

export const ProfileInfo = (props) =>{
    debugger;
    return <div>
        <div>
            <img src={props.profile.photos.large} alt=""/>
            <div>Full Name: {props.profile.fullName}</div>
            <div>About me: {props.profile.aboutMe}</div>
            <div>{props.profile.lookingForAJob && <span>Lokking for a job: {props.profile.lookingForAJobDescription}</span>}</div>
            <hr/>
            {
                Object.keys(props.profile.contacts).map(key=>{
                    debugger;
                    if (!!props.profile.contacts[key]){
                        return <div>
                            {key}: {props.profile.contacts[key]}
                        </div>
                    }
                })
            }

        </div>
    </div>
}