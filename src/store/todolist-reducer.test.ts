import {
    addTodolistAC, changeTodolistEntityStatusAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    RemoveTodolistAC, setTodolistAC, TodolistDomainType,
    todolistsReducer,
} from "./todolists-reducer";
import {v1} from "uuid";
import {RequestStatusType} from "./app-reducer";


let todolistId1: string;
let todolistId2: string;

let startState: Array<TodolistDomainType> = [];
beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {
            id: todolistId1, title: "What to learn", entityStatus:'idle', addedDate: '',
            order: 0, filter: 'all'
        },
        {
            id: todolistId2, title: "What to buy", entityStatus:'idle', addedDate: '',
            order: 0, filter: 'all'
        }
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, RemoveTodolistAC(todolistId2));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId1);
});

test('correct todolist should be added', () => {
    let newTodolistTitle = "New Todolist";
    const endState = todolistsReducer(startState, addTodolistAC({title: newTodolistTitle, id: '1'}))
    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {
    let newTodolistTitle = "New Todolist";

    const endState = todolistsReducer(startState, changeTodolistTitleAC(newTodolistTitle, todolistId2));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = "completed";

    const endState = todolistsReducer(startState, changeTodolistFilterAC(newFilter, todolistId2));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

test('todolists should be set to the state', () => {
    const action = setTodolistAC(startState)
    const endState = todolistsReducer([], action);
    expect(endState.length).toBe(2);
});

test(' delete todolist', () => {
    const action = RemoveTodolistAC(todolistId1)
    const endState = todolistsReducer(startState, action);
    expect(endState.length).toBe(1);
});

test('correct entityStatus of todolist should be changed', () => {
    let newStatus: RequestStatusType = 'loading';
    const action = changeTodolistEntityStatusAC(todolistId2, newStatus)
    const endState = todolistsReducer(startState, action);

    expect(endState[0].entityStatus).toBe('idle');
    expect(endState[1].entityStatus).toBe(newStatus);
});
