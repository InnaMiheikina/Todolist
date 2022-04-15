import React from "react";
import './App.css';
import {Todolist} from "./components/Todolist";
import {useState} from "react";
import {v1} from "uuid";
import {InputAndButton} from "./components/InputAndButton";
import {AppBar, Avatar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";


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
            {id: v1(), title1: "HTML&CSSxx", isDone: true},
            {id: v1(), title1: "JSxx", isDone: true},
            {id: v1(), title1: "ReactJSxxxx", isDone: false}
        ],
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
        debugger
        setTasks1({...tasks1,[todolistId]: tasks1[todolistId].map(t => t.id === taskId ? {...t, isDone} : t)})
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
    const changeTaskTitle = (id: string, todolistId: string, newTaskTitle1: string) => {
        setTasks1({
            ...tasks1,
            [todolistId]: tasks1[todolistId].map(t => t.id === id ? {...t, title1: newTaskTitle1} : t)
        })
    }
    const changeTodolistTitle = (todolistId: string, title: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title} : tl)) //title пришел снизу
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
            <Grid item key={tl.id}>
                <Paper elevation={8} style={{padding: '20px', maxWidth: '300px'}}>
                    <Todolist
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
                </Paper>
            </Grid>
        )
    })
    return (
        <div className="App">
            <AppBar position='fixed'>
                <Container fixed>
                    <Toolbar>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"/>
                        <IconButton edge='start'
                                    color='inherit' aria-laabel='menu'>
                            <Menu/>
                        </IconButton>
                        <Typography variant={'h6'}>Todolist Blog</Typography>
                        <Button color={'inherit'} variant={'outlined'}>Login</Button>
                    </Toolbar>
                </Container>
            </AppBar>

            <Container fixed>
                <Box sx={{my: 7}}>
                    <Grid container>
                        <InputAndButton callback={addTodolist}/>
                    </Grid>
                </Box>
                <Grid container spacing={6}>
                    {todolistComponents}
                </Grid>
            </Container>
        </div>
    )
}

export default App;

