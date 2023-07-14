import React, {ChangeEvent, useState} from 'react';


type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}
export const EditableSpan = (props: EditableSpanPropsType) => {

    let [title, setTitle] = useState(props.title)
    let [editMode, setEditMode] = useState(false)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.onChange(e.currentTarget.value)
    }

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    return (
        <>
            {editMode ? (<input value={props.title}
                                 onChange={onChangeHandler}
                                 onBlur={activateViewMode}
                                 autoFocus/>)


                : <span onDoubleClick={activateEditMode}>{props.title}</span>}
        </>
    );
};

