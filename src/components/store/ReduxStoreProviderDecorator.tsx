import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers, legacy_createStore} from 'redux'

import {v1} from 'uuid'

import {todolistsReducer} from "./todolists-reducer";
import {AppRootStateType} from "./store";
import {tasksReducer} from "./tasks-reducer";
import {TaskPriorities, TaskStatuses} from "../api/tasks-api";
import {number, string} from "prop-types";


const rootReducer = combineReducers({
    tasks:tasksReducer,
    todolists:todolistsReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        /*{id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"}*/
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", status:TaskStatuses.New, addedDate:'', deadline:'', description:'',
                order:0, priority: TaskPriorities.Low, startDate: '', todoListId:"todolistId1"},
            {id: v1(), title: "JS", status:TaskStatuses.New, addedDate:'', deadline:'', description:'',
                order:0, priority: TaskPriorities.Low, startDate: '', todoListId:"todolistId1"},
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", status:TaskStatuses.New, addedDate:'', deadline:'', description:'',
                order:0, priority: TaskPriorities.Low, startDate: '', todoListId:"todolistId1"},
            {id: v1(), title: "React Book", status:TaskStatuses.New, addedDate:'', deadline:'', description:'',
                order:0, priority: TaskPriorities.Low, startDate: '', todoListId:"todolistId1"},
        ]
    }
};


export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>) //для провайдера