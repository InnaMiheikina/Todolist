import React, {ChangeEvent, memo, useState} from 'react';
import {TextField} from "@material-ui/core";

type InputOnSpanType = {
    title: string
    callback:(title:string)=> void
    classes: string
}

export const InputOnSpan = memo((props: InputOnSpanType) => {
    let [title, setTitle] = useState('')
    let [active, setActive] = useState<boolean>(false)

    const onActive = () => {
        setActive(true)
        setTitle(props.title)
    }
    const offActive = () => {
        setActive(false)
        props.callback(title)
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

