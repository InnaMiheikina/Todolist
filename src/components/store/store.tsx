import {todolistsReducer} from "./todolists-reducer";
import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import thunk, {ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";
import {tasksReducer} from "./tasks-reducer";

const rootReducer = combineReducers({
    tasks:tasksReducer,
    todolists:todolistsReducer
})
export const store = createStore(rootReducer,applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof rootReducer>


export type ThunkAppDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>


export const useAppDispatch = () => useDispatch<ThunkAppDispatch>()
//@ts-ignore
window.store = store;