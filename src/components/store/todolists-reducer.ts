import {todolistsAPI, TodolistType} from "../api/todolists-api";

export type ActionType =
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof RemoveTodolistAC>
    | ReturnType<typeof changeTitleTodolistAC>
    | ReturnType<typeof changeFilterAC>
    | ReturnType<typeof setTodolistAC>


export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & { filter: FilterValuesType }

export const initialState: Array<TodolistDomainType> = [
    /*{id: "todolistId_1", title: 'hello world', filter: 'all', addedDate: '', order: 0},
    {id: "todolistId_2", title: 'hello', filter: 'all', addedDate: '', order: 0}*/
]

export const todolistsReducer = (state = initialState, action: ActionType): TodolistDomainType[] => {
    switch (action.type) {
        case "SET-TODOLIST":
            return  action.todolists.map(tl=>({...tl,filter:'all'}))
        case "ADD-TODOLIST":
            const newTodo:TodolistDomainType ={...action.item,filter:'all'}
        return [newTodo, ...state]
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.id)
        case "CHANGE-TODOLIST-TITLE":
            return state.map(t => t.id === action.id ? {...t, title: action.title} : t)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)

        default:
            return state
    }
}
//action
export const addTodolistAC = (item:TodolistType) => ({type: 'ADD-TODOLIST', item} as const)
export const RemoveTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
export const changeTitleTodolistAC = (title: string, id: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    title,
    id
} as const)
export const changeFilterAC = (filter: FilterValuesType, id: string) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    filter,
    id
} as const)
export const setTodolistAC = (todolists: TodolistType[]) => ({type: 'SET-TODOLIST', todolists} as const)

//thunk
export const setTodolistTC = (dispatch:any) => {
todolistsAPI.getTodolists()
    .then((res)=> {
        dispatch(setTodolistAC(res.data))
    })
}
export const addTodolistTC =(title:string)=> (dispatch:any) => {
    todolistsAPI.createTodolist(title)
        .then((res)=> {
            dispatch(addTodolistAC(res.data.data.item))
        })
}
export const updateTodolistTC =(title:string,todolistId:string)=> (dispatch:any) => {
    todolistsAPI.updateTodolist(title,todolistId)
        .then((res)=> {
            dispatch(changeTitleTodolistAC(title,todolistId))
        })
}
export const deleteTodolistTC =(todolistId:string)=> (dispatch:any) => {
    todolistsAPI.deleteTodolist(todolistId)
        .then((res)=> {
            dispatch(RemoveTodolistAC(todolistId))
        })
}
