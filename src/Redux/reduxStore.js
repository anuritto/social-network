import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import authReducer from "./authReducer";
import appReducer from "./appReducer";


const reducers = combineReducers({
    auth: authReducer,
    app: appReducer
});
// для расширения redux store в хроме
//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const Store = createStore(reducers,composeEnhancers(applyMiddleware(thunkMiddleware)));

export default Store;