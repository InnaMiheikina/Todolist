import React, {ChangeEvent, KeyboardEvent, memo, useState} from "react";
import {AddToPhotosOutlined} from "@material-ui/icons";
import {TextField} from "@material-ui/core";


type InputAndButtonPropsType = {
    callback: (newTaskTitle: string) => void
    disabled?:boolean
}

export const InputAndButton = memo(({callback,disabled=false}: InputAndButtonPropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (newTaskTitle.trim()) {    //trim обрезает пробелы по краям
            callback(newTaskTitle.trim());
            setNewTaskTitle('')
        } else {
            setError('Title is required');
        }
    }

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null) //вводим текст и ошибка исчезает
        if (e.key === 'Enter') {
            addItem()
            setNewTaskTitle('');
        }
    }

    return (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <TextField
                disabled={disabled}
                size={'small'}
                variant={'outlined'}
                label={'Title'}
                value={newTaskTitle}      /*начальное значение*///добавление в массив
                onChange={onNewTitleChangeHandler}    /*обработчик события со значением*/
                onKeyPress={onKeyPressHandler}
                className={error ? 'error' : ''} // чтобы работал на кнопку "enter"// класс для инпута если есть error
            />
            <AddToPhotosOutlined color={disabled ? 'disabled' : 'action'}  type={'outlined'}
                                 onClick={addItem} >{'+'}</AddToPhotosOutlined>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
})