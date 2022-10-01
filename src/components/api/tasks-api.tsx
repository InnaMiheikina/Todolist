import axios from 'axios'
import {number, string} from "prop-types";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'bf243b90-7ff4-45a7-a936-e1d5864c8b9d'
    }
})
export type TaskType = {
    addedDate?: string
    deadline?: string
    description?: string
    id: string
    order?: number
    priority?: TaskPriorities
    startDate?: string
    status: TaskStatuses
    title: string
    todoListId: string
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type ResponseTaskType  = {
  error:string|null
    totalCount:number
    items:TaskType[]
}
export type ResponseType <D = {}> = {
    data: D
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
}

export const taskAPI = {
    getTask(todolistId: string) {
        return instance.get(`todo-lists/${todolistId}/tasks/`);
    },
    createTask(title: string, todolistId: string) {
        return instance.post(`/todo-lists/${todolistId}/tasks`, {title});
    },
     deleteTask(id:string,todolistId: string) {
         return instance.delete(`todo-lists/${todolistId}/tasks/${id}`);
     },
    updateTask(id: string, todolistId: string,model:any) {
        return instance.put(`todo-lists/${todolistId}/tasks/${id}`, model);
    }
}
