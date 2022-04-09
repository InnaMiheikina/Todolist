import React from "react";
import './App.css';
import {Todolist} from "./components/Todolist";
import {useState} from "react";
import {v1} from "uuid";
import {InputAndButton} from "./components/InputAndButton";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title2: string
    valueButton: FilterValuesType
}
let todolistId_1 = v1();
let todolistId_2 = v1();

function App() {
    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId_1, title2: 'hello world', valueButton: 'all'},
        {id: todolistId_2, title2: 'hello', valueButton: 'all'}
    ])
    let [tasks1, setTasks1] = useState({
        [todolistId_1]: [
            {id: v1(), title1: "HTML&CSS", isDone: true},
            {id: v1(), title1: "JS", isDone: true},
            {id: v1(), title1: "ReactJS", isDone: false}],
        [todolistId_2]: [
            {id: v1(), title1: "HTML&CSS", isDone: true},
            {id: v1(), title1: "JS", isDone: true},
            {id: v1(), title1: "ReactJS", isDone: false}]
    })



    const deleteTask = (todolistId: string, newId: string) => { //остановить машину с номером newId.фун-я прокидывается как кулбэк
        let filteredTasks = (tasks1[todolistId].filter(el => el.id !== newId));  /*функция для удаления,вызывается после какойто логики*/
        setTasks1({...tasks1, [todolistId]: filteredTasks});
    }
    const addTask = (newTaskTitle1: string, todolistId: string) => {  //добавление
        let newTask = {
            id: v1(),
            title1: newTaskTitle1,
            isDone: false //в новой всегда не отмеченно
        }
        setTasks1({...tasks1, [todolistId]: [newTask, ...tasks1[todolistId]]})
    }
    const changeStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        let task = tasks1[todolistId].find(e => e.id = taskId); //находит таску которую надо удвлить
        if (task) {
            task.isDone = isDone;             //функция меняет isDone
        }
        setTasks1({
            ...tasks1, [todolistId]:
                tasks1[todolistId].map(t => t.id === taskId ? ({...t, isDone}) : t)
        });//сетает
    }
    const tasksFilter = (todolistId: string, value: FilterValuesType) => { //функция перебирает значения Value=одно из значений
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, valueButton: value} : tl))//ьеняем фильтр в тудулист
    }
    const addTodolist = (newTaskTitle2: string) => {
        const newTodolistId = v1();
        const newTodolist: TodolistType = {
            id: newTodolistId,
            title2: newTaskTitle2,
            valueButton: 'all'
        }
        setTodolists([newTodolist, ...todolists])
        setTasks1({...tasks1, [newTodolistId]: []})
    }
    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(t => t.id !== todolistId))
        delete tasks1[todolistId];
        setTasks1({...tasks1})
    }
    const changeTaskTitle = (id: string, todolistId:string, newTaskTitle1: string) => {
        setTasks1({...tasks1,[todolistId]: tasks1[todolistId].map(t=> t.id === id ? {...t,title1:newTaskTitle1} : t) })
    }
    const changeTodolistTitle = (todolistId:string, title: string) => {
    setTodolists(todolists.map(tl => tl.id === todolistId ?  {...tl, title} : tl)) //title пришел снизу
    }

    const todolistComponents = todolists.map(tl => {
        let prokladka = tasks1[tl.id] //пишется всегда// тоже самое что filteredTasks
        // 'All' === 'Active'
        // 'Active' === 'Active'
        if (tl.valueButton === 'active') {
            prokladka = tasks1[tl.id].filter(el => !el.isDone)
        }
        if (tl.valueButton === 'completed') {
            prokladka = tasks1[tl.id].filter(el => el.isDone)
        }
        return (
            <Todolist
                key={tl.id}
                todolistId={tl.id}
                title2={tl.title2}
                tasks={prokladka}
                deleteTask={deleteTask}
                tasksFilter={tasksFilter}
                addTask={addTask}
                changeStatus={changeStatus}
                valueButton={tl.valueButton}
                removeTodolist={removeTodolist}
                changeTaskTitle={changeTaskTitle}
                changeTodolistTitle={changeTodolistTitle}
            />

        )
    })
    return (
        <div className="App">
            <InputAndButton callback={addTodolist}/>
            {todolistComponents}
        </div>
    )
}

export default App;

