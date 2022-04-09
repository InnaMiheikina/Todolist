import React, {ChangeEvent} from "react";
import {FilterValuesType} from "../App";
import s from './Todolist.module.css';
import {InputAndButton} from "./InputAndButton";
import {InputOnSpan} from "./InputOnSpan";

type TodolistPropsType = {
    todolistId: string,
    title2: string,
    tasks: Array<TaskType>
    deleteTask: (todolistId:string , newId: string) => void
    tasksFilter: (todolistId:string, value: FilterValuesType) => void
    addTask: (newTaskTitle1: string ,todolistId:string) => void
    changeStatus: (todolistId:string, taskId: string, isDone: boolean) => void
    valueButton: FilterValuesType //подсвечивать кнопку
    removeTodolist:(todolistId: string) => void;
    changeTaskTitle:(id: string, todolistId:string, title:string) => void
    changeTodolistTitle:(id:string, newTaskTitle2: string)=> void
}

type TaskType = {
    id: string,
    title1: string,
    isDone: boolean
}

export const Todolist = (props: TodolistPropsType) => {

    const onAllClickHandler = () => {props.tasksFilter(props.todolistId,'all')};
    const onActiveClickHandler = () => {props.tasksFilter(props.todolistId,'active')};
    const onCompletedClickHandler = () => {props.tasksFilter(props.todolistId,'completed')};

const addTask = (newTaskTitle1:string)=> {props.addTask(newTaskTitle1,props.todolistId)}
    return (
        <div>
            <h3><InputOnSpan newTaskTitle={props.title2} callBack={()=> {} } />
                <button onClick={()=>props.removeTodolist(props.todolistId)}>x</button>
            </h3>
           <InputAndButton  callback={addTask} />
            <ul>
                {props.tasks.map((el, index) => {
                    const onRemoveHandler = () => {props.deleteTask(props.todolistId,el.id)}
                    const onChangeHandler = (id: string, event: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(props.todolistId, id, event.currentTarget.checked)
                    } // вызывает фуекция isDone
                    const changeTaskTitle = (title: string)=> {
                        props.changeTaskTitle(el.id,  props.todolistId, title )
                    }
                    return (
                        <li key={index}>
                            <input type='checkbox' checked={el.isDone} //галачка
                                   onChange={(e) => onChangeHandler(el.id, e )}/>
                            <InputOnSpan newTaskTitle={el.title1} callBack={changeTaskTitle} />
                            <button onClick={onRemoveHandler}>х</button>
                            {/*el.id то что кидаем в функцию*/}
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