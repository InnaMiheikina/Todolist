import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {RequestStatusType, setAppStatusAC, SetStatusActionType} from "./app-reducer";
import {Dispatch} from "redux";

export type ActionType =
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof RemoveTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodolistAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>


export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

export const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state = initialState, action: ActionType): TodolistDomainType[] => {
    switch (action.type) {
        case "SET-TODOLIST":
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        case "ADD-TODOLIST":
            const newTodo: TodolistDomainType = {...action.item, filter: 'all', entityStatus: 'idle'}
            return [newTodo, ...state]
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.id)
        case "CHANGE-TODOLIST-TITLE":
            return state.map(t => t.id === action.id ? {...t, title: action.title} : t)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case "CHANGE-TODOLIST-ENTITY-STATUS":
        default: return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
            return state
    }
}
//action
export const addTodolistAC = (item: TodolistType) => ({type: 'ADD-TODOLIST', item} as const)
export const RemoveTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
export const changeTodolistTitleAC = (title: string, id: string) => ({
    type: 'CHANGE-TODOLIST-TITLE', title, id
} as const)
export const changeTodolistFilterAC = (filter: FilterValuesType, id: string) => ({
    type: 'CHANGE-TODOLIST-FILTER', filter, id
} as const)
export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) => ({
    type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, status
} as const)
export const setTodolistAC = (todolists: TodolistType[]) => ({type: 'SET-TODOLIST', todolists} as const)

//thunk
export const setTodolistTC = (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.getTodolists()
        .then((res) => {
            dispatch(setTodolistAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const addTodolistTC = (title: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.createTodolist(title)
        .then((res) => {
            dispatch(addTodolistAC(res.data.data.item))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const updateTodolistTC = (title: string, todolistId: string) => (dispatch: any) => {
    todolistsAPI.updateTodolist(title, todolistId)
        .then((res) => {
            dispatch(changeTodolistTitleAC(title, todolistId))
        })
}
export const deleteTodolistTC = (todolistId: string) => (dispatch: any) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todolistId,'loading'))
    todolistsAPI.deleteTodolist(todolistId)
        .then((res) => {
            dispatch(RemoveTodolistAC(todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
}

type ThunkDispatch = Dispatch<ActionType | SetStatusActionType>

