import React from 'react';
import {setAppErrorAC, setAppStatusAC, SetErrorActionType, SetStatusActionType} from "../components/store/app-reducer";
import {ResponseType} from '../api/todolists-api'
import {Dispatch} from "redux";

export const  handleServerAppError = <D>(data:ResponseType<D>, dispatch:Dispatch<SetErrorActionType | SetStatusActionType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}


export const handleServerNetworkError = (error:any, dispatch: Dispatch<SetErrorActionType | SetStatusActionType>) => {
    dispatch(setAppErrorAC(error.messages ? error.messages : 'Some error occurred'))
    dispatch(setAppStatusAC('failed'))
};


