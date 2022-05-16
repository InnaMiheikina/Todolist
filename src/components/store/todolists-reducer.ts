
import {v1} from "uuid";
import {FilterValuesType} from "../../AppRedux";

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
export type TodolistType = {
    id: string
    title2: string
    valueButton: FilterValuesType
}
export type ActionType = AddTodolistAT | RemoveTodolistAT |ChangeTitleTodolistAT|ChangeFilterAT
export let todolistId_1 = v1();
export let todolistId_2 = v1();
 export const  initialState:Array<TodolistType> = [
    {id: todolistId_1, title2: 'hello world', valueButton: 'all'},
    {id: todolistId_2, title2: 'hello', valueButton: 'all'}
]

export const todolistsReducer = (state=initialState, action: ActionType): Array<TodolistType> => {
        switch (action.type) {
            case "ADD-TODOLIST":
                let newTodolist:TodolistType ={
                    id:action.todolistId,
                    title2: action.title,
                    valueButton:'all'
                }
                return [ newTodolist, ...state]
            case "REMOVE-TODOLIST":
                return state.filter(tl=> tl.id !== action.id )
            case "CHANGE-TODOLIST-TITLE":
                return state.map(t=> t.id === action.id ? {...t, title2:action.title} : t)
            case "CHANGE-TODOLIST-FILTER":
                return  state.map(tl => tl.id === action.id ? {...tl, valueButton: action.filter} : tl)

            default: return state
        }
    }

export const addTodolistAC=(title:string): AddTodolistAT =>({type:'ADD-TODOLIST',title, todolistId:v1() })
export const RemoveTodolistAC=(id:string): RemoveTodolistAT =>({type:'REMOVE-TODOLIST', id})
export const changeTitleTodolistAC=(title:string, id:string): ChangeTitleTodolistAT =>({type: 'CHANGE-TODOLIST-TITLE',title, id})
export const changeFilterAC=(filter: FilterValuesType,id:string): ChangeFilterAT =>({type:'CHANGE-TODOLIST-FILTER',filter, id})