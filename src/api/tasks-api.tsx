import axios from 'axios'

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
export type updateTaskModelType = {
    title:string
    description:string
    status:TaskStatuses
    priority:TaskPriorities
    startDate:string
    deadline:string
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
    getTasks(todolistId: string) {
        return instance.get<ResponseTaskType>(`todo-lists/${todolistId}/tasks/`);
    },
    createTask(title: string, todolistId: string) {
        return instance.post<ResponseType<{item:TaskType}>>(`/todo-lists/${todolistId}/tasks`, {title});
    },
     deleteTask(id:string,todolistId: string) {
         return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${id}`);
     },
    updateTask(id: string, todolistId: string, model:any) {
        return instance.put<ResponseType<{item:TaskType}>>(`todo-lists/${todolistId}/tasks/${id}`, model);
    }
}
