import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import t from '../App.module.css'


type AddItemFormPropsType = {
    todolistId: string
    addItem: (todolistId:string, title:string) => void
}

export const AddItemForm = (props:AddItemFormPropsType) => {

    let [title, setTitle] = useState('')
    const [error, setError] = useState<string>('')
    const titleOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError('')
    }

    const addItemFormHandler = () => {
        if (title.trim() === '') {
            setError('Заполните поле ввода!')
            return
        }
        props.addItem(props.todolistId, title.trim())
        setTitle('')
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('')
        if (e.keyCode === 13) {
            addItemFormHandler()
        }
    }

    return (
        <>
            <input  className={t.inputField__input}
                    value={title}
                    onChange={titleOnChangeHandler}
                    onKeyDown={onKeyPressHandler}/>
            <button className={t.add__button}
                    onClick={addItemFormHandler}>Add</button>
            <div className={t.todolist__error}>
                {error && <div className={t.todolist__error_text}>{error}</div>}
            </div>
        </>
    );
};

