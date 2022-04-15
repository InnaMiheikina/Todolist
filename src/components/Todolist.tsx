import React, {ChangeEvent} from "react";
import {FilterValuesType} from "../App";
import {InputAndButton} from "./InputAndButton";
import {InputOnSpan} from "./InputOnSpan";
import {Delete, DeleteOutline, HighlightOff} from "@material-ui/icons";
import {Button, ButtonGroup, Checkbox, List, ListItem, Typography} from "@material-ui/core";

type TodolistPropsType = {
    todolistId: string,
    title2: string,
    tasks: Array<TaskType>
    deleteTask: (todolistId: string, newId: string) => void
    tasksFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (newTaskTitle1: string, todolistId: string) => void
    changeStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    valueButton: FilterValuesType //подсвечивать кнопку
    removeTodolist: (todolistId: string) => void;
    changeTaskTitle: (id: string, todolistId: string, title: string) => void
    changeTodolistTitle: (id: string, newTaskTitle2: string) => void
}

type TaskType = {
    id: string,
    title1: string,
    isDone: boolean
}

export const Todolist = (props: TodolistPropsType) => {
    const onAllClickHandler = () => {
        props.tasksFilter(props.todolistId, 'all')
    };
    const onActiveClickHandler = () => {
        props.tasksFilter(props.todolistId, 'active')
    };
    const onCompletedClickHandler = () => {
        props.tasksFilter(props.todolistId, 'completed')
    };
    const addTask = (newTaskTitle1: string) => {
        props.addTask(newTaskTitle1, props.todolistId)
    }

    return (
        <div>
            <Typography variant={'h5'}>
                <InputOnSpan newTaskTitle={props.title2} callBack={() => {
                }} classes={''}/>
                <Button onClick={() => props.removeTodolist(props.todolistId)}>
                    <HighlightOff/>
                </Button>
            </Typography>
            <div>
                <InputAndButton callback={addTask}/>
            </div>
            <List>
                {props.tasks.map((el) => {
                    const onRemoveHandler = () => {
                        props.deleteTask(props.todolistId, el.id)
                    }
                    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(props.todolistId, el.id, event.currentTarget.checked)
                    } // вызывает фуекция isDone
                    const changeTaskTitle = (title: string) => {
                        props.changeTaskTitle(el.id, props.todolistId, title)
                    }
                    return (
                        <ListItem key={el.id} style={{padding: '0'}}>
                            <Checkbox
                                checked={el.isDone}
                                onChange={onChangeHandler}
                            />
                            <InputOnSpan
                                newTaskTitle={el.title1}
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
                <Button color="primary" className={props.valueButton === 'all' ? 'primary' : 'secondary'}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button color="primary" className={props.valueButton === 'active' ? 'primary' : 'secondary'}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button color="primary" className={props.valueButton === 'completed' ? 'primary' : 'secondary'}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </ButtonGroup>

        </div>
    )
};