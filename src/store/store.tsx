import {TodolistActionType, todolistsReducer} from "./todolists-reducer";
import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";
import {TaskActionType, tasksReducer} from "./tasks-reducer";
import {appReducer, AppAppActionType} from "./app-reducer";
import {AuthActionType, authReducer} from "./auth-reducer";

const rootReducer = combineReducers({
    tasks:tasksReducer,
    todolists:todolistsReducer,
    app:appReducer,
    auth:authReducer
})
export const store = createStore(rootReducer,applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof rootReducer>

//1.то возвращает
//2.state всего прилажения
//3.экстра аргументы
//4.все action всего App

export type AppActionType = TodolistActionType | TaskActionType | AppAppActionType | AuthActionType;
export const useAppDispatch = ()=> useDispatch<AppDispatch>()
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionType>

//@ts-ignore
window.store = store;