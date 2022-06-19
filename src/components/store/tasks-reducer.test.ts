
import {addTaskAC, changeTitleTaskAC, deleteTaskAC, tasksReducer, taskStatusAC} from "./tasks-reduser";
import {addTodolistAC, RemoveTodolistAC} from "./todolists-reducer";
import {TasksStateType} from "../../AppRedux";


let startState:TasksStateType
beforeEach(()=>{
    startState={
        'todolistId_1': [
            {id: '1', title1: "HTML&CSSxx", isDone: true},
            {id: '2', title1: "JSxx", isDone: true},
            {id: '3', title1: "ReactJSxxxx", isDone: false}
        ],
        'todolistId_2': [
            {id: '1', title1: "HTML&CSS", isDone: true},
            {id: '2', title1: "JS", isDone: true},
            {id: '3', title1: "ReactJS", isDone: false}]
    }
})

test ('correct tasks should be removed ', ()=> {

    const action = deleteTaskAC('2','todolistId_1')
    const endState = tasksReducer(startState,action)

    expect(endState['todolistId_1'].length).toBe(2)
    expect(endState['todolistId_2'].length).toBe(3)
})
test('correct task should be added to correct addTasks', ()=> {

    const action = addTaskAC('todolistId_2', 'hello')
    const endState = tasksReducer(startState,action)
    expect(endState['todolistId_2'].length).toBe(4)
    expect(endState['todolistId_1'].length).toBe(3)
    expect(endState['todolistId_2'][0].title1).toBe('hello')
})

test('correct change tasks status ', () => {

    const action = taskStatusAC('todolistId_2',true, '3' )
    const endState = tasksReducer(startState, action)
    expect(endState['todolistId_2'][2].isDone).toBe(true)
})

test('title of specified task should be changed', ()=> {

    const action = changeTitleTaskAC( 'todolistId_1', 'fdfhg', '1')
    const endState = tasksReducer(startState, action)
    expect(endState['todolistId_1'][0].title1).toBe('fdfhg')
})

test('new array should be added when new todolist is added', ()=> {

    const action = addTodolistAC('new title')
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);
    const newKey = keys.find(k=> k != 'todolistId_1' && k != 'todolistId_2')
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
});