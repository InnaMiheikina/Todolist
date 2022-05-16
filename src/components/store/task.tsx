import React, {ChangeEvent, memo, useCallback} from 'react';
import {changeTitleTaskAC, deleteTaskAC, taskStatusAC} from "./tasks-reduser";
import {Button, Checkbox, ListItem} from "@material-ui/core";
import {InputOnSpan} from "../InputOnSpan";
import {HighlightOff} from "@material-ui/icons";
import {TaskType} from "../Todolist";
import {useDispatch} from "react-redux";

export type TaskTypeProps = {
    todolistId: string
    task:TaskType
}

const Task = (props:TaskTypeProps) => {

    let dispatch = useDispatch()
    let {id, title1, isDone} = props.task
    const onRemoveHandler = useCallback(() => {
        dispatch(deleteTaskAC(id, props.todolistId))
    }, [dispatch])
    const onChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        let newIsDone = event.currentTarget.checked
        dispatch(taskStatusAC(props.todolistId, newIsDone, id))
    } , [dispatch,props.todolistId, id])// вызывает фуекция isDone
    const changeTaskTitle = useCallback( (newTaskTitle1: string) => {
        dispatch(changeTitleTaskAC(id, newTaskTitle1, props.todolistId))
    }, [dispatch,id, props.todolistId ])

    return (
        <ListItem key={id} style={{padding: '0'}}>
            <Checkbox
                checked={isDone}
                onChange={onChangeHandler}
            />
            <InputOnSpan
                title={title1}
                callBack={changeTaskTitle}
                classes={isDone ? "is-done" : ""}
            />
            <Button onClick={onRemoveHandler}>
                <HighlightOff/>
            </Button>
            {/*el.id то что кидаем в функцию*/}
        </ListItem>
    )
}


export default memo(Task);