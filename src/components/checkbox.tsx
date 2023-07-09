import React, {ChangeEvent} from 'react';
import t from "../App.module.css";


type CheckboxType = {
    isDone: boolean
    callback: (isDone: boolean) => void
}
const Checkbox = (props: CheckboxType) => {
    let onCheckedHandler = (e: ChangeEvent<HTMLInputElement>) =>
        props.callback(e.currentTarget.checked)


    return (
        <>
            <input className={t.todolist__checkbox} type="checkbox" onChange={onCheckedHandler}
                   checked={props.isDone}/>
        </>
    );
};

export default Checkbox;