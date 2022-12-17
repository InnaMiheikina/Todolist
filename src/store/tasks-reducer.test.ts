import {addTodolistAC, RemoveTodolistAC, setTodolistAC} from "./todolists-reducer";
import {TasksStateType} from "../App";
import {addTaskAC, deleteTaskAC, setTaskAC, tasksReducer, updateTaskAC} from "./tasks-reducer";
import {TaskPriorities, TaskStatuses} from "../api/tasks-api";
import {number, string} from "prop-types";


let startState: TasksStateType={};
beforeEach(() => {
    startState = {
        'todolistId_1': [
            {id: '1', title: "html", addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low,
                startDate: '', status: TaskStatuses.Completed, todoListId: 'todolistId_1'
            },
            {id: '2', title: "JS/ts", addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low,
                startDate: '', status: TaskStatuses.Completed, todoListId: 'todolistId_1'
            },
        ],

        'todolistId_2': [
            {id: '1', title: "JS", addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low,
                startDate: '', status: TaskStatuses.Completed, todoListId: 'todolistId_2'
            },
            {id: '2', title: "HTML", addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low,
                startDate: '', status: TaskStatuses.Completed, todoListId: 'todolistId_2'
            },

        ]
    }
})
    test('correct tasks should be removed ', () => {

        const action = deleteTaskAC('2', 'todolistId_1')
        const endState = tasksReducer(startState, action)

        expect(endState['todolistId_1'].length).toBe(1)
        expect(endState['todolistId_2'].length).toBe(2)
    })
    test('correct task should be added to correct addTasks', () => {

        const action = addTaskAC('todolistId_2', {
            id: '3', title: "Hello", addedDate: '', deadline: '', description: '', order: 0, priority: 0,
            startDate: "", status: TaskStatuses.New, todoListId: 'todolistId_2'
        })
        const endState = tasksReducer(startState, action)
        expect(endState['todolistId_2'].length).toBe(3)
        expect(endState['todolistId_1'].length).toBe(2)
        expect(endState['todolistId_2'][0].title).toBe('Hello')
        expect(endState['todolistId_2'][0].status).toBe(TaskStatuses.New)
    })
    test('correct change tasks status ', () => {
        const action = updateTaskAC('2','todolistId_2',{
            status:TaskStatuses.New,
            id:'2',
            title: 'HTML',
            todoListId: 'todolistId_2'
        })
        const endState = tasksReducer(startState, action)
        expect(endState['todolistId_2'][1].status).toBe(TaskStatuses.New)
        expect(endState['todolistId_1'][1].status).toBe(TaskStatuses.Completed)
    })
    test('title of specified task should be changed', () => {
        const action = updateTaskAC(  '1','todolistId_1',{
            status:TaskStatuses.New,
            id:'1',
            todoListId: 'todolistId_1',
            title:'by'})
        const endState = tasksReducer(startState, action)
        expect(endState['todolistId_1'][0].title).toBe("by")
        expect(endState['todolistId_1'][1].title).toBe('JS/ts')
    })
    test('new array should be added when new todolist is added', () => {
        const action = addTodolistAC({
            id:'ddsa',
            title:'new todolist',
            order:0,
            addedDate:''
        })
        const endState = tasksReducer(startState, action)

        const keys = Object.keys(endState);
        const newKey = keys.find(k => k != 'todolistId_1' && k != 'todolistId_2')
        if (!newKey) {
            throw Error("new key should be added")
        }

        expect(keys.length).toBe(3)
        expect(endState[newKey]).toEqual([]);
    })
    test('property with todolistId should be deleted', () => {

        const action = RemoveTodolistAC('todolistId_2');
        const endState = tasksReducer(startState, action)
        const keys = Object.keys(endState);

        expect(keys.length).toBe(1);
        expect(endState["todolistId2"]).toBeUndefined();
    })
    test('empty arrays should be added when we set todolists', () => {
        const action = setTodolistAC([
            {id:'1', title: "What to learn", addedDate: '', order: 0},
            {id: '2', title: "What to buy", addedDate: '', order: 0}
        ]);
        const endState = tasksReducer({}, action)
        const keys = Object.keys(endState);

        expect(keys.length).toBe(2);
        expect(endState['1']).toStrictEqual([])
        expect(endState['2']).toStrictEqual([])
    })
    test('tasks should be added for todolists', () => {
        const action = setTaskAC('todolistId_1', startState['todolistId_1']);
        const endState = tasksReducer({
            'todolistId_2':[],
            'todolistId_1':[],

        }, action)
        const keys = Object.keys(endState);

        expect(endState['todolistId_1'].length).toBe(2)
    })