import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from './Button';
import {InputAndButton} from "../components/InputAndButton";
import {action} from "@storybook/addon-actions";
import Task from "../components/store/task";
import {TaskType} from "../components/Todolist";
import {Provider, useSelector} from "react-redux";
import {AppRootStateType, store} from "../components/store/store";
import {ReduxStoreProviderDecorator} from "../components/store/ReduxStoreProviderDecorator";

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


const TaskWithDispatch = () => {
    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId2'][0])

    return <Task
        task={task}
        todolistId={'todolistId2'}
    />
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TaskWithDispatch> = (args) => <TaskWithDispatch  />;

 export const TaskWithDispatchStories = Template.bind({});
TaskWithDispatchStories.args = {}

// // More on args: https://storybook.js.org/docs/react/writing-stories/args
// TaskIsDoneStories.args = {
//     task:{id:'bvc', isDone:true, title1:'js'}
// };//пропсы из компоненты
//
// export const TaskIsNotDoneStories = Template.bind({});
// // More on args: https://storybook.js.org/docs/react/writing-stories/args
// TaskIsNotDoneStories.args = {
//     task: {id: 'ghj', isDone: false, title1: 'bhjk'}
//}