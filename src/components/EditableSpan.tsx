import React, {ChangeEvent, useState} from 'react';


type EditableSpanPropsType = {
    title: string
    onChange: (title: string) => void
}
export const EditableSpan = (props: EditableSpanPropsType) => {

    let [title, setTitle] = useState(props.title)
    let [editMode, setEditMode] = useState(false)

    //фиксируем измененный тайтл
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.onChange(e.currentTarget.value)
    }

    //включить режим редактирования
    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    //выключить режим редактирования
    const activateViewMode = () => {
        setEditMode(false)
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

