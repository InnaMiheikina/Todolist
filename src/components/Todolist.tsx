import React, {useCallback} from "react";
import {InputAndButton} from "./InputAndButton";
import {InputOnSpan} from "./InputOnSpan";
import {HighlightOff} from "@material-ui/icons";
import {Button, ButtonGroup, List, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {changeFilterAC, changeTitleTodolistAC, RemoveTodolistAC, TodolistType} from "./store/todolists-reducer";
import {addTaskAC,} from "./store/tasks-reduser";
import Task from "./store/task";

type TodolistPropsType = {
    todolistId: string
}
export type TaskType = {
    id: string,
    title1: string,
    isDone: boolean
}


export const Todolist = React.memo((props: TodolistPropsType) => {
    const dispatch = useDispatch()
    let todolists = useSelector<AppRootStateType, TodolistType>(state => state.todolists.filter(el => el.id === props.todolistId)[0])
    let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.todolistId])
    let {id, title2, valueButton} = todolists

    let prokladka = tasks;
    if (valueButton === 'active') {
        prokladka = prokladka.filter(el => !el.isDone)
    }
    if (valueButton === 'completed') {
        prokladka = prokladka.filter(el => el.isDone)

    }

    const changeTitleTodolist = useCallback((title: string) => {
        dispatch(changeTitleTodolistAC(title, id))
    }, [dispatch, id])
    const onAllClickHandler = useCallback(() =>{
        dispatch(changeFilterAC('all', id))
    }, [dispatch, 'all', id])
    const onActiveClickHandler = useCallback(() => dispatch(changeFilterAC('active', id)), [dispatch, 'active', id])
    const onCompletedClickHandler = useCallback(() => dispatch(changeFilterAC('completed', id)), [dispatch, 'completed', id])

    const addTask = useCallback((newTaskTitle1: string) => {
            dispatch(addTaskAC(id, newTaskTitle1))
        }, [dispatch, id]
    )

    return (
        <div>
            <Typography variant={'h5'}>
                <InputOnSpan title={title2} callBack={changeTitleTodolist} classes={''}/>
                <Button onClick={useCallback(() => dispatch(RemoveTodolistAC(id)), [dispatch, id])}>
                    <HighlightOff/>
                </Button>
            </Typography>
            <div>
                <InputAndButton callback={addTask}/>
            </div>
            <List>
                {
                    prokladka.map((el) => {
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
                <Button color="primary" className={valueButton === 'all' ? 'primary' : 'secondary'}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button color="primary" className={valueButton === 'active' ? 'primary' : 'secondary'}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button color="primary" className={valueButton === 'completed' ? 'primary' : 'secondary'}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </ButtonGroup>

        </div>
    )
})