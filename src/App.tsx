import React, {memo, useCallback, useEffect} from "react";
import './App.css';
import {
    AppBar,
    Avatar,
    Button, CircularProgress,
    Container,
    IconButton, LinearProgress,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {AppRootStateType, useAppDispatch} from "./store/store";
import {useSelector} from "react-redux";
import {TaskType} from "./api/tasks-api";
import {ErrorSnackbar} from "./components/ErrorSnackbar/ErrorSnackbar";
import {initializedAppTC, RequestStatusType} from "./store/app-reducer";
import {BrowserRouter, HashRouter, Navigate, Route, Routes,} from "react-router-dom";
import {Login} from "./components/Login/login";
import {TodolistList} from "./components/todolistList/TodolistList";
import {logoutTC} from "./store/auth-reducer";


export type  TasksStateType = {
    [todolistId: string]: TaskType[]
}
type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    let status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    let isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType,boolean>(state=> state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializedAppTC());
    }, [])

    const logoutHandler = useCallback(()=> {
        dispatch(logoutTC())
    },[])


    if (!isInitialized) {
        return <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress />
        </div>
    }

    return (
        <HashRouter>
            <div className="App">
                < ErrorSnackbar/>
                <AppBar position='fixed'>
                    <Toolbar>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"/>
                        <IconButton edge='start'
                                    color='inherit' aria-laabel='menu'>
                            <Menu/>
                        </IconButton>
                        <Typography variant={'h6'}>Todolist Blog</Typography>
                        {isLoggedIn && <Button color={'inherit'} variant={'outlined'} onClick={logoutHandler}>Log out</Button>}
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                <Container fixed>
                    <Routes>
                        <Route path={'/login'} element={<Login/>}/>
                        <Route path={'/'} element={<TodolistList demo={demo}/>}/>
                        <Route path={'/404'} element={<h1 style={{textAlign:'center'}}>404: PAGE NOT FOUND</h1>} />
                        <Route path={'*'} element={<Navigate to={'/404'}/>} />
                    </Routes>
                </Container>
            </div>
        </HashRouter>
    )
}

export default memo(App);

