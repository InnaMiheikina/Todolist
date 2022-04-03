import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValuesType} from "../App";
import s from './Todolist.module.css';
import {Input} from "./Input";
import {MyButton} from "./MyButton";

type TodolistPropsType = {
    todolistId: string,
    title: string,
    tasks: Array<TaskType>
    deleteTask: (todolistId:string , newId: string) => void
    tasksFilter: (todolistId:string, value: FilterValuesType) => void
    addTask: (title: string ,todolistId:string) => void
    changeStatus: (todolistId:string, taskId: string, isDone: boolean) => void
    valueButton: FilterValuesType //подсвечивать кнопку
}

type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export const Todolist = (props: TodolistPropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState(' ');
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        debugger
        if (newTaskTitle.trim() !== "") {    //trim обрезает пробелы по краям
            props.addTask(newTaskTitle.trim(), props.todolistId);
            setNewTaskTitle('')
        } else {
            setError('Title is required');
        }
        console.log(newTaskTitle)
    }
    const onAllClickHandler = () => {
        props.tasksFilter(props.todolistId,'all')
    };
    const onActiveClickHandler = () => {
        props.tasksFilter(props.todolistId,'active')
    };
    const onCompletedClickHandler = () => {
        props.tasksFilter(props.todolistId,'completed')
    };

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <Input value={newTaskTitle} setError={setError} setNewTaskTitle={setNewTaskTitle}
                       newTaskTitle={newTaskTitle} callback={addTask} className={error ? `${s.error}` : ""}/>
               <MyButton name={'+'} callback = {addTask} />
                {error && <div className={s.errorMessage}>{error}</div>}
            </div>
            <ul>
                {props.tasks.map((el, index) => {
                    const onRemoveHandler = () => {props.deleteTask(props.todolistId,el.id)}
                    const onChangeHandler = (id: string, event: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(props.todolistId, id, event.currentTarget.checked)
                    } // вызывает фуекция isDone
                    return (
                        <li key={index}>
                            <input type='checkbox' checked={el.isDone} //галачка
                                   onChange={(e) => onChangeHandler(el.id, e )}/>
                            <button onClick={onRemoveHandler}>х</button>
                            {/*el.id то что кидаем в функцию*/}
                            <span>{el.title}</span>
                        </li>
                    )
                })
                }
            </ul>
            <div>
                <button className={props.valueButton === 'all' ? `${s.activeFilter}` : ''}
                        onClick={onAllClickHandler}>All
                </button>
                <button className={props.valueButton === 'active' ? `${s.activeFilter}` : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.valueButton === 'completed' ? `${s.activeFilter}` : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
};