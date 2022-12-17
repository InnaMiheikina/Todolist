import axios from 'axios'
import {number, string} from "prop-types";
import {ResponseType} from "./tasks-api";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'bf243b90-7ff4-45a7-a936-e1d5864c8b9d'
    }
})

export type  LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?:string
}
export const authAPI = {
    login(data:LoginParamsType) {
        return instance.post<ResponseType<{userId?:number}>>(`auth/login`, data);
    },
    logout (){
        return instance.delete<ResponseType<{userId?:number}>>(`auth/login`);
    },
    me(){
      return  instance.get<ResponseType<{id:number,email: string, login:string}>>(`auth/me`)
    }
}
