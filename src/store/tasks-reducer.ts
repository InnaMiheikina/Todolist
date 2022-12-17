import {TasksStateType} from "../App";
import {addTodolistAC, RemoveTodolistAC, setTodolistAC} from "./todolists-reducer";
import {taskAPI, TaskPriorities, TaskStatuses, TaskType} from "../api/tasks-api";
import {AppRootStateType, AppThunk} from "./store";
import { setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";


export const initialState = {}
export const tasksReducer = (state: TasksStateType = initialState, action: TaskActionType): TasksStateType => {
    switch (action.type) {
        case 'SET-TASK':
            return {
                ...state,
                [action.todolistId]: action.tasks
            }
        case 'SET-TODOLIST':
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        case 'DELETE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.id)
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.todolistId]: [action.task, ...state[action.todolistId]]
            }
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.id ? {
                    ...action.task
                } : t)
            }
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.item.id]: []
            }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy

        }
        default:
            return state
    }
}
//action
export const setTaskAC = (todolistId: string, tasks: TaskType[]) => ({type: 'SET-TASK', todolistId, tasks} as const)
export const deleteTaskAC = (id: string, todolistId: string) => ({
    type: 'DELETE-TASK', id, todolistId
} as const)
export const addTaskAC = (todolistId: string, task: TaskType) => ({type: 'ADD-TASK', todolistId, task} as const)
export const updateTaskAC = (id: string, todolistId: string, task: TaskType) => ({
    type: 'UPDATE-TASK',id, todolistId, task} as const)


//thunk
export const setTasksTC = (todolistId: string):AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    taskAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(setTaskAC(todolistId, res.data.items))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const addTasksTC = (title: string, todolistId: string):AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    taskAPI.createTask(title, todolistId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(todolistId, res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data,dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error,dispatch);
        })
}
export const deleteTasksTC = (id: string, todolistId: string):AppThunk => (dispatch) => {
    taskAPI.deleteTask(id, todolistId)
        .then((res) => {
            dispatch(deleteTaskAC(id, todolistId))
        })
}

export type updateTaskModelType = {
    title?:string
    description?:string
    status?:TaskStatuses
    priority?:TaskPriorities
    startDate?:string
    deadline?:string
}
export const updateTasksTC = (id: string, todolistId: string, model: updateTaskModelType):AppThunk => (dispatch, getState: () => AppRootStateType) => {
    const task = getState().tasks[todolistId].find(t => t.id === id)
    if (task) {
        taskAPI.updateTask(id, todolistId, {
            title: task.title,
            status: task.status,
            startDate: task.startDate,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            ...model
        })
            .then((res) => {
                if(res.data.resultCode === 0) {
                    dispatch(updateTaskAC(id, todolistId, res.data.data.item))
                }else {
                    handleServerAppError(res.data,dispatch);
                }
            })
            .catch((error) => {
                handleServerNetworkError(error,dispatch);
            })
    }
}
export type TaskActionType =
    ReturnType<typeof addTodolistAC>
    | ReturnType<typeof RemoveTodolistAC>
    | ReturnType<typeof setTodolistAC>
    | ReturnType<typeof setTaskAC>
    | ReturnType<typeof deleteTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>