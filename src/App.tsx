import React from "react";
import './App.css';
import {Todolist} from "./components/Todolist";
import {useState} from "react";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    valueButton: FilterValuesType
}
let todolistId_1 = v1();
let todolistId_2 = v1();

function App() {
    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId_1, title: 'hello world', valueButton: 'all'},
        {id: todolistId_2, title: 'hello', valueButton: 'all'}
    ])
    let [tasks1, setTasks1] = useState({
        [todolistId_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}],
        [todolistId_2]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}]
    })

    const deleteTask = (todolistId:string, newId: string) => { //остановить машину с номером newId.фун-я прокидывается как кулбэк
        let filteredTasks = (tasks1[todolistId].filter(el => el.id !== newId));  /*функция для удаления,вызывается после какойто логики*/
        setTasks1({...tasks1,[todolistId]:filteredTasks});
    }
    const addTask = (title: string ,todolistId:string) => {  //добавление
        let newTask = {
            id: v1(),
            title: title,
            isDone: false //в новой всегда не отмеченно
        }
       setTasks1({...tasks1,[todolistId] :[ newTask,...tasks1[todolistId] ]})
    }
    const changeStatus = (todolistId:string,taskId: string, isDone: boolean) => {
        let task = tasks1[todolistId].find(e => e.id = taskId); //находит таску которую надо удвлить
        if (task) {
            task.isDone = isDone;             //функция меняет isDone
        }
        setTasks1({...tasks1,[todolistId]:
            tasks1[todolistId].map(t => t.id === taskId ? ({...t, isDone}) : t)});//сетает
    }

    const tasksFilter = (todolistId:string, value: FilterValuesType) => { //функция перебирает значения Value=одно из значений
        setTodolists(todolists.map(tl => tl.id ===todolistId ? {...tl,valueButton:value} : tl))//ьеняем фильтр в тудулист
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
                    todolistId = {tl.id}
                    title={tl.title}
                    tasks={prokladka}
                    deleteTask={deleteTask}
                    tasksFilter={tasksFilter}
                    addTask={addTask}
                    changeStatus={changeStatus}
                    valueButton={tl.valueButton}
                />

        )
    })
 return (
     <div className="App">
         {todolistComponents}
     </div>
 )
}

export default App;

