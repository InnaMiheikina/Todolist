import React, {ChangeEvent} from "react";
import {InputAndButton} from "./InputAndButton";
import {InputOnSpan} from "./InputOnSpan";
import { HighlightOff} from "@material-ui/icons";
import {Button, ButtonGroup, Checkbox, List, ListItem, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {TasksStateType} from "../AppRedux";
import {changeFilterAC, changeTitleTodolistAC, RemoveTodolistAC, TodolistType} from "./store/todolists-reducer";
import {addTaskAC, changeTitleTaskAC, deleteTaskAC, taskStatusAC} from "./store/tasks-reduser";

type TodolistPropsType = {
    todolistId: string
}

export type TaskType = {
    id: string,
    title1: string,
    isDone: boolean
}


export const Todolist = (props: TodolistPropsType) => {
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

    const changeTitleTodolist = (title: string) => {
        dispatch(changeTitleTodolistAC(title, id))
    }
        const onAllClickHandler = () => {dispatch(changeFilterAC('all', id))};
        const onActiveClickHandler = () => {dispatch(changeFilterAC('active', id))};
        const onCompletedClickHandler = () => {dispatch(changeFilterAC('completed', id))};
        const addTask = (newTaskTitle1: string) => {dispatch(addTaskAC(id,newTaskTitle1))}

        return (
            <div>
                <Typography variant={'h5'}>
                    <InputOnSpan title={title2} callBack={changeTitleTodolist} classes={''}/>
                    <Button onClick={() => dispatch(RemoveTodolistAC(id))}>
                        <HighlightOff/>
                    </Button>
                </Typography>
                <div>
                    <InputAndButton callback={addTask}/>
                </div>
                <List>
                    {prokladka.map((el) => {
                        const onRemoveHandler = () => {
                            dispatch(deleteTaskAC(el.id, id))
                        }
                        const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            let newIsDone = event.currentTarget.checked
                            dispatch(taskStatusAC(id, newIsDone, el.id ))
                        } // вызывает фуекция isDone
                        const changeTaskTitle = (newTaskTitle1: string) => {
                            dispatch(changeTitleTaskAC(id, newTaskTitle1, el.id))
                        }
                        return (
                            <ListItem key={el.id} style={{padding: '0'}}>
                                <Checkbox
                                    checked={el.isDone}
                                    onChange={onChangeHandler}
                                />
                                <InputOnSpan
                                    title={el.title1}
                                    callBack={changeTaskTitle}
                                    classes={el.isDone ? "is-done" : ""}
                                />
                                <Button onClick={onRemoveHandler}>
                                    <HighlightOff/>
                                </Button>
                                {/*el.id то что кидаем в функцию*/}
                            </ListItem>
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
    }