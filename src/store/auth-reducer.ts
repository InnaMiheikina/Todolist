import {setAppStatusAC} from "./app-reducer";
import {authAPI, LoginParamsType} from "../api/auth-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {AppThunk} from "./store";

export const initialState: InitialStateType = {
    isLoggedIn: false
}
type InitialStateType = { isLoggedIn: boolean }
export const authReducer = (state: InitialStateType = initialState, action: AuthActionType): InitialStateType => {
    switch (action.type) {
        case "login/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
//action
export const setIsLoggedInAC = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)

//thunk
export const loginTC = (data: LoginParamsType):AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch);
        })
}
export const logoutTC = ():AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch);
        })
}

export type AuthActionType = ReturnType<typeof setIsLoggedInAC>
