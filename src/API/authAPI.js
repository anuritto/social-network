import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {'API-KEY': 'b227e61c-7fce-4acc-ab37-96baa228101e'}
});

export const authAPI = {
    me() {
        return instance.get('auth/me')
    },
    logIn(email,password,rememberMe,captcha){
        debugger;
        return instance.post('auth/login',{email,password,rememberMe,captcha})
    },
    logOut(){
        return instance.post('auth/logout')
    }
};
