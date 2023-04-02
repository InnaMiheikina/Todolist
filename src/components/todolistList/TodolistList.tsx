import React, {useCallback, useEffect} from "react";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../store/store";
import {addTodolistTC, setTodolistTC, TodolistDomainType} from "../../store/todolists-reducer";
import {Box, Container, Grid, Paper} from "@material-ui/core";
import {InputAndButton} from "../InputAndButton";
import {Todolist} from "../Todolist";
import { Navigate } from "react-router-dom";


type todolistListType = {
    demo?:boolean
}
export const TodolistList:React.FC<todolistListType> = ({demo=false}:todolistListType)=> {
    let todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const isLoggedIn = useSelector<AppRootStateType,boolean>(state=> state.auth.isLoggedIn)
    let dispatch = useAppDispatch()

    const addTodolist = useCallback((title:string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

    useEffect(() => {
        if(demo || !isLoggedIn){
            return
        }
        dispatch(setTodolistTC())
    }, [])

    if(!isLoggedIn){
        return <Navigate to={'/login'} />
    }

    return(
        <>
            <Container fixed>
                <Box sx={{my: 7}}>
                    <Grid container>
                        <InputAndButton callback={addTodolist}/>
                    </Grid>
                </Box>
                <Grid container spacing={6}>
                    {todolists.map(tl => {
                        return (
                            <Grid item key={tl.id}>
                                <Paper elevation={8} style={{padding: '20px', maxWidth: '300px'}}>
                                    <Todolist todolistId={tl.id} demo={demo}/>
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </>
    )

}