import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers,  legacy_createStore} from 'redux'

import {v1} from 'uuid'
import {tasksReducer} from "./tasks-reduser";
import {todolistsReducer} from "./todolists-reducer";
import {AppRootStateType} from "./store";



const rootReducer = combineReducers({
    tasks:tasksReducer,
    todolists:todolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title2: "What to learn", valueButton: "all"},
        {id: "todolistId2", title2: "What to buy", valueButton: "all"}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title1: "HTML&CSS", isDone: true},
            {id: v1(), title1: "JS", isDone: true}
        ],
        ["todolistId2"]: [
            {id: v1(), title1: "Milk", isDone: true},
            {id: v1(), title1: "React Book", isDone: true}
        ]
    }
};


export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>) //для провайдера