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

export const porfileAPI = {
    getProfile(userID){
        return instance.get(`profile/${userID}`);
    },
    updateProfile(profile){
        return instance.put('/profile',profile)
}
}

export const usersAPI = {
    getUsers (page,count=10){
        return instance.get(`/users?page=${page}&count=${count}`)
    }
}

export const dialogsAPI = {
    startDialog(userId) {
        return instance.put(`dialogs/${userId}`)
    },
    getAllDialogs(){
        return instance.get('dialogs')
    },
    getMessagesWith(userId){
        return instance.get(`dialogs/${userId}/messages`)
    },
    sendMessage(userId,message){
        return instance.post(`dialogs/${userId}/messages`,{body:message})
    },
    
}