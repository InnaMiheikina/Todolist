import React, {ChangeEvent, memo, useState} from 'react';
import {TextField} from "@material-ui/core";

type InputOnSpanType = {
    title: string //title из таски и тдлисиста
    callBack:(title:string)=> void //передает title вверх который только что напечатался
    classes: string
}

export const InputOnSpan = memo((props: InputOnSpanType) => {
    let [title, setTitle] = useState('')
    let [active, setActive] = useState<boolean>(false)

    const onActive = () => {
        setActive(true)
        setTitle(props.title) //первоначальное засетай то что есть
    }
    const offActive = () => {
        setActive(false)
        props.callBack(title)//ф-я меняет тайтл
    }
    const onchangeInput = (e:ChangeEvent<HTMLInputElement>) => {setTitle(e.currentTarget.value)}

    return (
        active
            ? <TextField
            className={props.classes}
                value={title}
            onChange={onchangeInput}
            autoFocus onBlur={offActive}  />
            : <span style={{fontWeight:'bold'}} onDoubleClick={onActive}>{props.title}</span>
    );
})
//onBlur --кликаем мимо и деактив
//autoFocus -- когда импут активируется фокус уже твм
