import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import {reduxForm} from "redux-form";
import {CreateField} from "../Common/formControl";
import style from './Profile.module.css';
import {noPhoto} from "../Common/NoUserPhoto";

export const ProfileInfo = (props) => {
    let [editMode, setEditMode] = useState(false);
    let onSubmit = (formData) => {
        props.updateProfileUserData(formData).then(() => {
            setEditMode(false);
        })

    }
    return <>

        <div className={style.profile}>
            <div className="avatar">
                {!props.profile.photos.large ?
                    <img className={"z-depth-2 "+style.avatarimg} src={noPhoto} alt=""/>
                    :
                    <img className={"z-depth-2 "+style.avatarimg} src={props.profile.photos.large} alt=""/>
                }
            </div>
            {editMode ?
                <ProfileDataEditForm profile={props.profile} setEditMode={setEditMode} onSubmit={onSubmit} initialValues={props.profile}/>
                :
                <ProfileData profile={props.profile} setEditMode={setEditMode} isOwner={props.isOwner} />
            }

            <div className={style.buttonsitem}>
                {props.isOwner && editMode!=true &&<div className={style.buttonsitem}>
                    <button className="waves-effect cyan lighten-1 btn" onClick={()=> setEditMode(true)}>Edit Profile</button>
                </div>}
                {!props.isOwner &&
                    <div className={style.buttons}>
                        <NavLink className="waves-effect cyan lighten-2 btn" to={`/dialogs/${props.userID}`}><i
                            className="material-icons left">mail</i>Send Message</NavLink>
                    </div>
                }
                {!props.isOwner && <>
                    {props.following ?
                        <div className={style.buttonsitem}>
                            <button onClick={() => props.unFollowUser()} className="waves-effect red lighten-3 btn"><i
                                className="material-icons left">check</i>unfollow
                            </button>
                        </div>
                        :
                        <div className={style.buttonsitem}>
                            <button onClick={() => props.followUser()} className="waves-effect cyan lighten-2 btn"><i
                                className="material-icons left">check</i>follow
                            </button>
                        </div>
                    }
                </>}
            </div>
        </div>
    </>
}

const ProfileData = (props) => {
    return <>

        <div className={style.discription}>
            <div className={style.fullname}>
            <div><h2>{props.profile.fullName}</h2></div>
            <div><p>Status</p></div>
            </div>
            <div className={style.informationItem}>
                <div className={style.iname}><h5>About me</h5></div>
                <div className={style.ivalue}><p>{props.profile.aboutMe}</p></div>
            </div>
            <div className={style.informationItem}>

                <div className={style.iname}><h5>Looking for a job</h5></div>
                {props.profile.lookingForAJob ?
                    <div className={style.ivalue}><p>Yes</p></div>
                :
                    <div className={style.ivalue}><p>No</p></div>
                }
            </div>
            {props.profile.lookingForAJob &&
                <div className={style.informationItem}>
                <div className={style.iname}><h5>work skills</h5></div>
                <div className={style.ivalue}><p>{props.profile.lookingForAJobDescription}</p></div>
                </div>
            }
            <div className={style.informationItem}>
                <div className={style.iname}><h5></h5></div>
                <div className={style.ivalue}><p></p></div>
            </div>
            <h4>Contacts:</h4>
            <div className={style.informationItem}>
                <div className={style.iname}><h5></h5></div>
                <div className={style.ivalue}><p></p></div>
            </div>
            {
                Object.keys(props.profile.contacts).map(key=>{
                    if (!!props.profile.contacts[key]){
                        return <div className={style.informationItem}>
                            <div className={style.iname}><h5>{key}</h5></div>
                            <div className={style.ivalue}><p>{props.profile.contacts[key]}</p></div>
                        </div>
                    }
                })
            }
        </div>

        </>
}

const ProfileDataEdit = (props) => {
    return <div className={style.discription}><form onSubmit={props.handleSubmit}>

        {props.error && <div>error : {props.error}</div>}
        <div><p>Full Name: </p>{CreateField('input','fullName','your full name')}</div>
        <div>About me: {CreateField('input','aboutMe','about you')}</div>

        <div className="switch">
            <label>
                Need work?
                {CreateField('input','lookingForAJob',null,[],{type:"checkbox"})}

                    <span className="lever"></span>
                    Yes
            </label>
        </div>

        <div>Your skills: {CreateField('input','lookingForAJobDescription','your work skills')}</div>
        <b>Contacts:</b>

        {
            Object.keys(props.profile.contacts).map(key=>{
                    return <div>
                        {CreateField('input','contacts.'+key,key,)}
                    </div>
            })
        }

        <button className="waves-effect cyan lighten-1 btn" >Save</button>
        <button className="waves-effect red lighten-1 btn" type='button' onClick={()=>{props.setEditMode(false)}}>Cancel</button>
        </form>

        </div>
}

const ProfileDataEditForm = reduxForm({form:'profileEdit'})(ProfileDataEdit);