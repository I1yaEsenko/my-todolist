import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {TextField} from "@mui/material";


type EditableSpanPropsType = {
  title: string
  onChange: (title: string) => void
}
export const EditableSpan = (props: EditableSpanPropsType) => {

  let [title, setTitle] = useState(props.title)
  let [editMode, setEditMode] = useState(false)
  // let [error, setError] = useState('')
  //фиксируем измененный тайтл
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.currentTarget.value)
  }

  //включить режим редактирования
  const activateEditMode = () => {
    setEditMode(true)
    // if (title.trim() === '') {
    //   setError('Введите название задачи!')
    //   return
    // }
    setTitle(props.title)
  }
  //выключить режим редактирования
  const activateViewMode = () => {
    setEditMode(false)
  }

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setEditMode(false)
    }
  }
  return (
    <>
      {editMode ? (

          // <input value={props.title}
          //        onChange={onChangeHandler}
          //        onBlur={activateViewMode}
          //        onKeyDown={onKeyDownHandler}
          //        autoFocus/>)
          <TextField value={props.title}
                     variant="outlined"
                     onChange={onChangeHandler}
                     onBlur={activateViewMode}
                     onKeyDown={onKeyDownHandler}
                     autoFocus
                     />)

        : <span onDoubleClick={activateEditMode}>{props.title}</span>}
    </>
  );
};

