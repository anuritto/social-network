import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import {reduxForm} from "redux-form";
import {CreateField} from "../Common/formControl";

export const ProfileInfo = (props) => {
    debugger;
    let [editMode, setEditMode] = useState(false);
    let onSubmit = (formData)=>{
        props.updateProfileUserData(formData).then(()=>{
            setEditMode(false);
        })

    }
    return <div>
        <div>
            <img src={props.profile.photos.large} alt=""/>
            {!props.isOwner && <div><NavLink to={`/dialogs/${props.userID}`}>Send Message</NavLink></div>}
            <hr/>


            {editMode ?
                <ProfileDataEditForm profile={props.profile} setEditMode={setEditMode} onSubmit={onSubmit} initialValues={props.profile}/>
                :
                <ProfileData profile={props.profile} setEditMode={setEditMode} isOwner={props.isOwner} />
            }

        </div>
    </div>
}

const ProfileData = (props) => {
    return <>
        {props.isOwner && <button onClick={()=> props.setEditMode(true)}>Edit</button>}
        <div>Full Name: {props.profile.fullName}</div>
        <div>About me: {props.profile.aboutMe}</div>
        <div>{props.profile.lookingForAJob &&
        <span>Lokking for a job: {props.profile.lookingForAJobDescription}</span>}</div>
        {
            Object.keys(props.profile.contacts).map(key=>{
                if (!!props.profile.contacts[key]){
                    return <div>
                        {key}: {props.profile.contacts[key]}
                    </div>
                }
            })
        }
        </>
}

const ProfileDataEdit = (props) => {
    return <form onSubmit={props.handleSubmit}>
            <button>Save</button>
        {props.error && <div>error : {props.error}</div>}
        <div>Full Name: {CreateField('input','fullName','your full name')}</div>
        <div>About me: {CreateField('input','aboutMe','about you')}</div>
        <div>Looking for a job? {CreateField('input','lookingForAJob','',[],{type:'checkbox'})}</div>
        <div>Your skills: {CreateField('input','lookingForAJobDescription','about you')}</div>
        <b>Contacts:</b>

        {
            Object.keys(props.profile.contacts).map(key=>{
                    return <div>
                        {CreateField('input','contacts.'+key,key,)}
                    </div>
            })
        }
        </form>
}

const ProfileDataEditForm = reduxForm({form:'profileEdit'})(ProfileDataEdit);