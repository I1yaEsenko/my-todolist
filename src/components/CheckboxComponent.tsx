import React, {ChangeEvent} from 'react';
import Checkbox from '@mui/material/Checkbox';

type CheckboxType = {
    isDone: boolean
    callback: (isDone: boolean) => void
}
 export const CheckboxComponent = (props: CheckboxType) => {
    let onCheckedHandler = (e: ChangeEvent<HTMLInputElement>) =>
        props.callback(e.currentTarget.checked)



    return (

        <>
            {/*<input className={t.todolist__checkbox} type="checkbox" onChange={onCheckedHandler}*/}
            {/*       checked={props.isDone}/>*/}
            <Checkbox onChange={onCheckedHandler}  checked={props.isDone}/>
        </>
    );
};
