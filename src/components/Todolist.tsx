import React, {useCallback, useEffect} from "react";
import {InputAndButton} from "./InputAndButton";
import {InputOnSpan} from "./InputOnSpan";
import {HighlightOff} from "@material-ui/icons";
import {Button, ButtonGroup, List, Typography} from "@material-ui/core";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "./store/store";
import {
    changeFilterAC,
    deleteTodolistTC,
    TodolistDomainType,
    updateTodolistTC
} from "./store/todolists-reducer";
import Task from "./store/task";
import { addTasksTC, setTasksTC} from "./store/tasks-reducer";
import {TaskStatuses, TaskType} from "./api/tasks-api";


type TodolistPropsType = {
    todolistId: string
}



export const Todolist = React.memo((props: TodolistPropsType) => {
    const dispatch = useAppDispatch()
    let todolist = useSelector<AppRootStateType, TodolistDomainType>(state => state.todolists.filter(el => el.id === props.todolistId)[0])
    let {id, title, filter} = todolist
    let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.todolistId])

    let prokladka = tasks;
    if (filter === 'active') {
        prokladka = prokladka.filter(t => t.status===TaskStatuses.New)
    }
    if (filter === 'completed') {
        prokladka = prokladka.filter(t => t.status===TaskStatuses.Completed)
    }

    const changeTitleTodolist = useCallback((title: string) => {
        dispatch(updateTodolistTC(title, props.todolistId))
    }, [dispatch, id])

    const deleteTodolist = useCallback(() => {
        dispatch(deleteTodolistTC(id))
    }, [dispatch, id])

    const onAllClickHandler = useCallback(() => {
        dispatch(changeFilterAC('all', id))
    }, [dispatch, 'all', id])
    const onActiveClickHandler = useCallback(() => dispatch(changeFilterAC('active', id)), [dispatch, 'active', id])
    const onCompletedClickHandler = useCallback(() => dispatch(changeFilterAC('completed', id)), [dispatch, 'completed', id])

    const addTask = useCallback((newTaskTitle: string) => {
            dispatch(addTasksTC(newTaskTitle,props.todolistId))
        }, [dispatch, id]
    )
useEffect(()=> {
    dispatch(setTasksTC(id))
},[])

    return (
        <div>
            <Typography variant={'h5'}>
                <InputOnSpan title={title} callBack={changeTitleTodolist} classes={''}/>
                <Button onClick={deleteTodolist}>
                    <HighlightOff/>
                </Button>
            </Typography>
            <div>
                <InputAndButton callback={addTask}/>
            </div>
            <List>
                {
                    prokladka && prokladka.map((el) => {
                        return (
                            <Task todolistId={id}
                                  task={el}
                            />
                        )
                    })
                }
            </List>
            <ButtonGroup
                size={'small'}
                variant={'contained'}
                disableElevation>
                <Button color="primary" className={filter === 'all' ? 'primary' : 'secondary'}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button color="primary" className={filter === 'active' ? 'primary' : 'secondary'}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button color="primary" className={filter === 'completed' ? 'primary' : 'secondary'}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </ButtonGroup>

        </div>
    )
})