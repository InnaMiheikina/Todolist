import React, {ChangeEvent, memo, useCallback} from 'react';
import {Button, Checkbox, ListItem} from "@material-ui/core";
import {InputOnSpan} from "../InputOnSpan";
import {HighlightOff} from "@material-ui/icons";
import {deleteTaskAC, updateTasksTC} from "./tasks-reducer";
import {TaskStatuses, TaskType} from "../api/tasks-api";
import {useAppDispatch} from "./store";

export type TaskTypeProps = {
    todolistId: string
    task:TaskType
}

const Task = (props:TaskTypeProps) => {

    let dispatch = useAppDispatch()
    let {id, title: title, status} = props.task

    const onRemoveHandler = useCallback(() => {
        dispatch(deleteTaskAC(id, props.todolistId))
    }, [dispatch,id, props.todolistId])

    const onChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        let newIsDone = event.currentTarget.checked
        dispatch(updateTasksTC(id, props.todolistId,{status:newIsDone ? TaskStatuses.Completed:TaskStatuses.New}))
    } , [dispatch,props.todolistId, id])// вызывает фуекция isDone

    const changeTaskTitle = useCallback( (newTaskTitle: string) => {
        dispatch(updateTasksTC(id,props.todolistId,{newTaskTitle}))
    }, [dispatch,id, props.todolistId ])

    return (
        <ListItem key={id} style={{padding: '0'}}>
            <Checkbox
                checked={status===TaskStatuses.Completed}
                onChange={onChangeHandler}
            />
            <InputOnSpan
                title={title}
                callBack={changeTaskTitle}
                classes={status===TaskStatuses.Completed ? "is-done" : ""}
            />
            <Button onClick={onRemoveHandler}>
                <HighlightOff/>
            </Button>
            {/*el.id то что кидаем в функцию*/}
        </ListItem>
    )
}


export default memo(Task);