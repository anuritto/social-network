import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import authReducer from "./authReducer";
import appReducer from "./appReducer";
import { reducer as formReducer } from 'redux-form'
import profileReducer from "./profileReducer";
import usersReducer from "./userReducer";
import dialogsReducer from "./dialogsReducer";

const reducers = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    app: appReducer,
    users: usersReducer,
    dialogs: dialogsReducer,
    form: formReducer
});
// для расширения redux store в хроме
//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const Store = createStore(reducers,composeEnhancers(applyMiddleware(thunkMiddleware)));

export default Store;