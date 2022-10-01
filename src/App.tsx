import React, {memo, useCallback, useEffect} from "react";
import './App.css';
import {Todolist} from "./components/Todolist";
import {InputAndButton} from "./components/InputAndButton";
import {AppBar, Avatar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {AppRootStateType, useAppDispatch} from "./components/store/store";
import {addTodolistTC, setTodolistTC, TodolistDomainType} from "./components/store/todolists-reducer";
import {useSelector} from "react-redux";
import {TaskType} from "./components/api/tasks-api";



export type  TasksStateType = {
    [todolistId: string]: TaskType[]
}

function App() {
    let todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    let dispatch = useAppDispatch()

    const addTodolist = useCallback((title:string) => {
       dispatch(addTodolistTC(title))
    }, [dispatch])

    useEffect(() => {
        dispatch(setTodolistTC)
    }, [])

 const todolistComponents = todolists.map(tl => {
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

export default memo(App);

