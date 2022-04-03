import React from 'react';

type MyButtonTypeProps = {
   name: string
    callback: ()=>void
}

export const MyButton = (props: MyButtonTypeProps) => {
    const onClickHandler = ()=> {
       props.callback()
    }
    return (
        <button onClick={onClickHandler}>{props.name}</button>
    );
};

