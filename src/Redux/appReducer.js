import {getUserData} from "./authReducer";


// action creators
const SET_IS_INITIALIZE_APP = 'APP/SET_IS_INITIALIZE_APP';
const setInitialized= ()=> ({type:SET_IS_INITIALIZE_APP})



// REDUCER
const appReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_IS_INITIALIZE_APP: {
            return {...state, isInitialized: true}
        }
        default:
            return {...state}
    }
};


// инициализация приложения
export const initializeApp = ()=> (dispatch)=>{
    const authResult = dispatch(getUserData());
    Promise.all([authResult]); // разобратсья почему через async/await не робит
    authResult.then(()=>{
        dispatch(setInitialized());
    });

}


//no touch
const initialState = {
    isInitialized: false
};
export default appReducer;