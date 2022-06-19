
import {v1} from "uuid";
import {AddTodolistAT, RemoveTodolistAT, todolistId_1, todolistId_2} from "./todolists-reducer";
import {TasksStateType} from "../../AppRedux";

type DeleteTaskAT= {
    type: 'DELETE-TASK'
    id:string
    todolistId:string
}
type AddTaskAT = {
    type: 'ADD-TASK'
    todolistId:string
    title: string
}
type TaskStatusAT = {
    type: 'TASK-STATUS'
    todolistId:string
    isDone: boolean
    id:string
}
type ChangeTaskTitleAT = {
    type: 'TASK-TITLE'
    todolistId:string
    title: string
    id:string
}

type ActionType = DeleteTaskAT | AddTaskAT | TaskStatusAT | ChangeTaskTitleAT| AddTodolistAT | RemoveTodolistAT

export const initialState:TasksStateType = {
    [todolistId_1]: [
        {id: v1(), title1: "HTML&CSSxx", isDone: true},
        {id: v1(), title1: "JSxx", isDone: true},
        {id: v1(), title1: "ReactJSxxxx", isDone: false}
    ],
    [todolistId_2]: [
        {id: v1(), title1: "HTML&CSS", isDone: true},
        {id: v1(), title1: "JS", isDone: true},
        {id: v1(), title1: "ReactJS", isDone: false}
    ]
}
export const tasksReducer = (state=initialState, action:ActionType): TasksStateType => {
switch (action.type) {
    case 'DELETE-TASK':
        return {
            ...state,
            [action.todolistId]: state[action.todolistId].filter(t=>t.id !== action.id)
        }
    case 'ADD-TASK':
        return {
            ...state,
            [action.todolistId]: [{id: v1(), title1:action.title, isDone: false}, ...state[action.todolistId]]
        }
    case 'TASK-STATUS':
        debugger
        return {
            ...state,
            [action.todolistId]: state[action.todolistId].map(t => t.id === action.id ? {
                ...t,
                isDone: action.isDone
            } : t)
        }
    case 'TASK-TITLE':
        return {
            ...state,
            [action.todolistId]:state[action.todolistId].map(t=> t.id === action.id ? {...t, title1:action.title} : t )
        }
    case 'ADD-TODOLIST':
    return {
        ...state,
        [action.todolistId]: []
    }
        case 'REMOVE-TODOLIST':
        {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy

        }

    default:
        return state
}
}

export const deleteTaskAC = (id:string,todolistId:string):DeleteTaskAT => ({type: 'DELETE-TASK', id, todolistId})
export const addTaskAC = (todolistId:string, title: string):AddTaskAT => ({  type: 'ADD-TASK', todolistId, title})
export const taskStatusAC = (todolistId:string, isDone: boolean, id:string): TaskStatusAT=> ({type: 'TASK-STATUS', todolistId,id, isDone})
export const changeTitleTaskAC = (id:string, title: string, todolistId:string): ChangeTaskTitleAT=> ({type: 'TASK-TITLE', todolistId, title, id})