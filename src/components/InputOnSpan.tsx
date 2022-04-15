import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

type InputOnSpanType = {
    newTaskTitle: string //title из таски и тдлисиста
    callBack:(title:string)=> void //передает title вверх который только что напечатался
    classes: string
}

export const InputOnSpan = (props: InputOnSpanType) => {
    let [title, setTitle] = useState('')
    let [active, setActive] = useState<boolean>(false)

    const onActive = () => {
        setActive(true)
        setTitle(props.newTaskTitle) //первоначальное засетай то что есть
    }
    const offActive = () => {setActive(false)
        props.callBack(title)
    }
    const onchangeInput = (e:ChangeEvent<HTMLInputElement>) => {setTitle(e.currentTarget.value)}

    return (
        active
            ? <TextField
            className={props.classes}
                value={title}
            onChange={onchangeInput}
            autoFocus onBlur={offActive}  />
            : <span style={{fontWeight:'bold'}} onDoubleClick={onActive}>{props.newTaskTitle}</span>
    );
}
//onBlur --кликаем мимо и деактив
//autoFocus -- когда импут активируется фокус уже твм
