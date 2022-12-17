import React from 'react';
import {setAppErrorAC, setAppStatusAC, SetAppErrorActionType, SetAppStatusActionType} from "../store/app-reducer";
import {ResponseType} from '../api/todolists-api'
import {Dispatch} from "redux";

export const  handleServerAppError = <D>(data:ResponseType<D>, dispatch:Dispatch<SetAppErrorActionType | SetAppStatusActionType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}


export const handleServerNetworkError = (error:any, dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>) => {
    dispatch(setAppErrorAC(error.messages ? error.messages : 'Some error occurred'))
    dispatch(setAppStatusAC('failed'))
};


