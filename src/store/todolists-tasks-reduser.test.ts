import {addTodolistAC, TodolistDomainType, todolistsReducer,} from "./todolists-reducer";
import {TasksStateType} from "../App";
import {tasksReducer} from "./tasks-reducer";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];

    const action = addTodolistAC({
        id:'1' ,
        addedDate: '',
        order: 0,
        title:"new todolist"});

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.item.id);
    expect(idFromTodolists).toBe(action.item.id);
});