import React from "react";
import './App.css';
import {TaskType, Todolist} from "./components/Todolist";
import {InputAndButton} from "./components/InputAndButton";
import {AppBar, Avatar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./components/store/store";
import {addTodolistAC, TodolistType} from "./components/store/todolists-reducer";



export type FilterValuesType = 'all' | 'active' | 'completed'

export type  TasksStateType = {
[todolistId:string]:TaskType[]
}

function AppRedux() {
   let todolists = useSelector<AppRootStateType,Array<TodolistType>>(state=>state.todolists)
    let dispatch = useDispatch()

    const addTodolist = (newTaskTitle2: string) => {
       dispatch(addTodolistAC(newTaskTitle2))
    }



    const todolistComponents = todolists.map(tl =>{
        return (
            <Grid item key={tl.id}>
                <Paper elevation={8} style={{padding: '20px', maxWidth: '300px'}}>
                    <Todolist todolistId={tl.id}/>
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

export default AppRedux;

