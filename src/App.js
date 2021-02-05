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
                    <div className={styles.AppWrapper}>
                        <HeaderContainer/>
                        <Nav/>
                        <div className={styles.content}>
                            <Switch>

                                <Route exact path='/'><Redirect to='/profile'></Redirect></Route>
                                <Route path='/dialogs' render={()=> <DialogsContainer/>}/>
                                <Route path='/login' render={()=> <LoginContainer/>}/>
                                <Route path='/profile' render={()=> <ProfileContainer/>}/>
                                <Route path='*' render={()=><div>404 NOT FOUND</div>}/>
                            </Switch>
                        </div>
                    </div>
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
