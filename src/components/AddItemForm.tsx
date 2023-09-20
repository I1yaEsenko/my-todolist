import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import {Button, IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";


type AddItemFormPropsType = {
  todolistId?: string | undefined
  addItem: (title: string) => void
}

export const AddItemForm = memo((props: AddItemFormPropsType) => {
  console.log('AddItemForm')
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
    props.addItem(title.trim())
    setTitle('')
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
   if (error) setError('')
    if (e.keyCode === 13) {
      addItemFormHandler()
    }
  }

  return (
    <>
      {/*<input className={t.inputField__input}*/}
      {/*       value={title}*/}
      {/*       onChange={titleOnChangeHandler}*/}
      {/*       onKeyDown={onKeyPressHandler}/>*/}
      <TextField variant={"outlined"}
                 value={title}
                 onChange={titleOnChangeHandler}
                 onKeyDown={onKeyPressHandler}
                 error={!!error} //ошибка
                 label='Enter title' //placeholder для инпута
                 helperText={error}//сообщение об ошибке
      />

      {/*<button className={t.add__button}*/}
      {/*        onClick={addItemFormHandler}>Add</button>*/}
      {/*<Button variant={"contained"} onClick={addItemFormHandler}>Add</Button>*/}
      <IconButton
        color = 'primary'
        onClick={addItemFormHandler}
      >

      <AddBox/>
      </IconButton>
      {/*<div className={t.todolist__error}>*/}
      {/*  {error && <div className={t.todolist__error_text}>{error}</div>}*/}
      {/*</div>*/}
    </>
  );
})

