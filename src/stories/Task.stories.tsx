import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Task from "../components/task";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../store/store";
import {ReduxStoreProviderDecorator} from "../store/ReduxStoreProviderDecorator";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/tasks-api";
import {action} from "@storybook/addon-actions";


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLISTS/Task',
    component: Task,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
args:{
    todolistId: 'todolistId2'
},
    decorators:[ReduxStoreProviderDecorator]

} as ComponentMeta<typeof Task>;

const changeTaskStatusCallBack = action('status changed inside Task')
const changeTaskTitleCallBack = action('title changed inside Task')
const removeTaskCallBack = action('remove button  inside Task was clicked')

const baseArgs = {
    changeTaskStatus:changeTaskStatusCallBack,
    changeTaskTitle:changeTaskTitleCallBack,
    removeTask:removeTaskCallBack
}


// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <Task {...args}  />;

 export const TaskIsDone = Template.bind({});
TaskIsDone.args = {
    ...baseArgs,
    task:{id:'1', title:'kjjj',addedDate: '', deadline: '', description: '', order: 0, priority: 0,
        startDate: '', status: 2, todoListId: 'todolistId1'}
}
export const TaskIsNotDone = Template.bind({});
TaskIsNotDone.args = {
    ...baseArgs,
    task:{id:'1', title:'kjjj',addedDate: '', deadline: '', description: '', order: 0, priority: 0,
        startDate: '', status: 0, todoListId: 'todolistId1'}
}
