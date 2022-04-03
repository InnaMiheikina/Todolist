
import React, {ChangeEvent, KeyboardEvent} from "react";

type InputPropsType = {
    setNewTaskTitle: (newTaskTitle: string) => void
    newTaskTitle: string
   callback: ()=>void
    setError: (error: string | null) => void
    value: string
    className: string
}

export const Input = (props: InputPropsType) => {

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        props.setError(null) //вводим текст и ошибка исчезает
        if (e.key === 'Enter') {
            props.callback();
            props.setNewTaskTitle('');
        }
    }

    return (
        <input value={props.newTaskTitle}      /*начальное значение*///добавление в массив
               onChange={onNewTitleChangeHandler}    /*обработчик события со значением*/
               onKeyPress={onKeyPressHandler}
               className={props.className}
        />      // чтобы работал на кнопку "enter"// класс для инпута если есть error
    )
}