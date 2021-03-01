import React from 'react';
import './App.css';
import {connect} from "react-redux";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import styles from './App.module.css'
import HeaderContainer from "./Components/Header/Header";
import {Nav} from "./Components/Navbar/Nav";
import DialogsContainer from "./Components/Dialogs/DialogsContainer";
import ProfileContainer from "./Components/Profile/ProfileContainer";
import {getUserData} from "./Redux/authReducer";
import {initializeApp} from "./Redux/appReducer";
import {Loading} from "./Components/Common/Loading";
import LoginContainer from "./Components/Login/Login";
import UsersContainer from "./Components/Users/UsersContainer";
import MessagesContainer from "./Components/Dialogs/MessagesContainer";

class App extends React.Component {
    componentDidMount(){
        this.props.initializeApp();
    }
    render() {
        if(!this.props.isInitialized){
            return <Loading/>
        }
        else return (
            <>
                <BrowserRouter>
                    <HeaderContainer/>
                    {/*<div className={styles.AppWrapper}>

                        <Nav/>
                        <div className={styles.content}>
                            <Switch>

                                <Route exact path='/'><Redirect to='/profile'></Redirect></Route>
                                <Route exact path='/dialogs' render={(props)=> <DialogsContainer {...props}/>}/>
                                <Route path='/dialogs/:userID' render={(props)=> <MessagesContainer {...props}/>}/>
                                <Route path='/users' render={()=> <UsersContainer/>}/>
                                <Route path='/login' render={()=> <LoginContainer/>}/>
                                <Route path='/profile/:userID?' render={(props)=> <ProfileContainer {...props}/>}/>
                                <Route path='*' render={()=><div>404 NOT FOUND</div>}/>
                            </Switch>
                        </div>
                    </div>*/}
                    <div className={'appwrapper'}>
                        <div className={"container mycontainer"}>
                            <div className={"app"}>
                                <Nav/>
                                <div className={"content"}>
                                    <Switch>

                                        <Route exact path='/'><Redirect to='/profile'></Redirect></Route>
                                        <Route exact path='/dialogs'
                                               render={(props) => <DialogsContainer {...props}/>}/>
                                        <Route path='/dialogs/:userID'
                                               render={(props) => <MessagesContainer {...props}/>}/>
                                        <Route path='/users' render={() => <UsersContainer/>}/>
                                        <Route path='/login' render={() => <LoginContainer/>}/>
                                        <Route path='/profile/:userID?'
                                               render={(props) => <ProfileContainer {...props}/>}/>
                                        <Route path='*' render={() => <div>404 NOT FOUND</div>}/>
                                    </Switch>
                                </div>

                            </div>
                        </div>
                    </div>
                    <footer className="page-footer cyan lighten-3">
                        <div className="container">
                            <div className="row">
                                <div className="col l6 s12">
                                    <h5 className="white-text">Social Network</h5>
                                    <p className="grey-text text-lighten-4">Front by A.Usmanov, Back by <a target="_blank" href="https://www.youtube.com/channel/UCTW0FUhT0m-Bqg2trTbSs0g">IT-kamasutra</a></p>
                                </div>
                                <div className="col l4 offset-l2 s12">
                                    <h5 className="white-text">Links</h5>
                                    <ul>
                                        <li><a className="grey-text text-lighten-3" target="_blank"
                                               href="https://github.com/anuritto/social-network">github</a></li>
                                        <li><a className="grey-text text-lighten-3"
                                               href="https://social-network.samuraijs.com/">API</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </footer>
                </BrowserRouter>
            </>
        );
    }
};
const mapStateToProps = (state)=> {
    return {
        isInitialized: state.app.isInitialized,
        isAuth: state.auth.isAuth
    }

};
const AppContainer = connect(mapStateToProps,{initializeApp,getUserData})(App);

export default AppContainer;
