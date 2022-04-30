import {FilterValuesType,TodolistType } from "../../App";
import {v1} from "uuid";

export type AddTodolistAT = {
    type:'ADD-TODOLIST'
    title:string
    todolistId: string
}
export type RemoveTodolistAT = {
    type:'REMOVE-TODOLIST'
    id: string
}
type ChangeTitleTodolistAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    title:string
    id:string
}
type ChangeFilterAT = {
    type:'CHANGE-TODOLIST-FILTER'
    filter: FilterValuesType
    id: string
}
export type ActionType = AddTodolistAT | RemoveTodolistAT |ChangeTitleTodolistAT|ChangeFilterAT


export const todolistsReducer = (todolists: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
        switch (action.type) {
            case "ADD-TODOLIST":
                let newTodolist:TodolistType ={
                    id:action.todolistId,
                    title2: action.title,
                    valueButton:'all'
                }
                return [ newTodolist, ...todolists]
            case "REMOVE-TODOLIST":
                return todolists.filter(tl=> tl.id !== action.id )
            case "CHANGE-TODOLIST-TITLE":
                return todolists.map(t=> t.id === action.id ? {...t, title2:action.title} : t)
            case "CHANGE-TODOLIST-FILTER":
                return todolists.map(tl => tl.id === action.id ? {...tl, valueButton: action.filter} : tl)
            default: return todolists
        }
    }

export const addTodolistAC=(title:string): AddTodolistAT =>({type:'ADD-TODOLIST',title, todolistId:v1() })
export const RemoveTodolistAC=(id:string): RemoveTodolistAT =>({type:'REMOVE-TODOLIST', id})
export const changeTitleTodolistAC=(title:string, id:string): ChangeTitleTodolistAT =>({type: 'CHANGE-TODOLIST-TITLE',title, id})
export const changeFilterAC=(filter: FilterValuesType,id:string): ChangeFilterAT =>({type:'CHANGE-TODOLIST-FILTER',filter, id})