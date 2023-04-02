import React, {ChangeEvent, memo, useCallback} from 'react';
import {Button, Checkbox, ListItem} from "@material-ui/core";
import {InputOnSpan} from "./InputOnSpan";
import {HighlightOff} from "@material-ui/icons";
import { deleteTasksTC, updateTasksTC} from "../store/tasks-reducer";
import {TaskStatuses, TaskType} from "../api/tasks-api";
import {useAppDispatch} from "../store/store";

export type TaskTypeProps = {
    todolistId: string
    task:TaskType
}

const Task = (props:TaskTypeProps) => {

    let dispatch = useAppDispatch()
    let {id, title: title, status} = props.task

    const onRemoveHandler = useCallback(() => {
        dispatch(deleteTasksTC(id, props.todolistId))
    }, [dispatch,id, props.todolistId])

    const onChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        let newIsDone = event.currentTarget.checked
        dispatch(updateTasksTC(id, props.todolistId,{status:newIsDone ? TaskStatuses.Completed:TaskStatuses.New}))
    } , [dispatch,props.todolistId, id])

    const changeTaskTitle = useCallback( (newTaskTitle: string) => {
        dispatch(updateTasksTC(id,props.todolistId,{title:newTaskTitle}))
    }, [dispatch,id, props.todolistId ])

    return (
        <ListItem key={id} style={{padding: '0'}}>
            <Checkbox
                checked={status===TaskStatuses.Completed}
                onChange={onChangeHandler}
            />
            <InputOnSpan
                title={title}
                callback={changeTaskTitle}
                classes={status===TaskStatuses.Completed ? "is-done" : ""}
            />
            <Button onClick={onRemoveHandler}>
                <HighlightOff/>
            </Button>
        </ListItem>
    )
}


export default memo(Task);