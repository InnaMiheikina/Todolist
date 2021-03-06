
import {
    addTodolistAC,
    changeFilterAC,
    changeTitleTodolistAC,
    RemoveTodolistAC,
    todolistsReducer, TodolistType
} from "./todolists-reducer";
import {v1} from "uuid";
import {FilterValuesType} from "../../AppRedux";

let todolistId1:string;
let todolistId2:string;

let startState: Array<TodolistType> = [];
beforeEach(()=> {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title2: "What to learn", valueButton: "all"},
        {id: todolistId2, title2: "What to buy", valueButton: "all"}
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, RemoveTodolistAC(todolistId2));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId1);
});

test('correct todolist should be added', () => {
    let newTodolistTitle = "New Todolist";
    const endState = todolistsReducer(startState, addTodolistAC( newTodolistTitle))
    expect(endState.length).toBe(3);
    expect(endState[0].title2).toBe(newTodolistTitle);
});


test('correct todolist should change its name', () => {
    let newTodolistTitle = "New Todolist";

    const endState = todolistsReducer(startState, changeTitleTodolistAC(newTodolistTitle ,todolistId2));

    expect(endState[0].title2).toBe("What to learn");
    expect(endState[1].title2).toBe( newTodolistTitle );
});


test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed";

    const endState = todolistsReducer(startState, changeFilterAC(newFilter, todolistId2));

    expect(endState[0].valueButton).toBe("all");
    expect(endState[1].valueButton).toBe(newFilter);
});
