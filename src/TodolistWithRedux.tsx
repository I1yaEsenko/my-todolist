import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import t from './App.module.css'
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from '@mui/icons-material'
import {CheckboxComponent} from "./components/CheckboxComponent";
import {TasksType, TodolistType} from "./AppWithRedux";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC, removeTaskAC, taskChangeCheckedAC} from "./state/tasks-reducer";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolist-reducer";


export type TodolistPropsType = {
  todolist: TodolistType
}

export const TodolistWithRedux = ({todolist}: TodolistPropsType) => {

  const {todolistId, title, filter} = todolist
  let tasks = useSelector<AppRootStateType, Array<TasksType>>( state => state.tasks[todolistId])

  const dispatch = useDispatch()

  // let [title, setTitle] = useState<string>('')
  //
  // let [error, setError] = useState<string>('')
  //
  // let titleOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
  //     setTitle(e.currentTarget.value)
  //     setError('')
  // }

  // let addTaskHandler = () => {
  //     if (title.trim() === '') {
  //         setError('Заполните поле ввода!')
  //         return
  //     }
  //     props.addTask(props.todolistId, title.trim())
  //     setTitle('')
  // }

  // const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
  //     setError('')
  //     if (e.keyCode === 13) {
  //         addTaskHandler()
  //     }
  // }

  const addTitleTask = (title: string) => {
    dispatch(addTaskAC(todolistId, title))
  }
  //Забираем id и состояние такси в основную компоненту
  const onCheckedHandler = (tId: string, isDone: boolean) => {
  dispatch(taskChangeCheckedAC(todolistId, tId, isDone))
  }
  // Фильтрация по выполнению тасок
  const allOnClickHandler = () => {
    dispatch(changeTodolistFilterAC(todolistId, 'All'))
  }
  const activeOnClickHandler = () => {
    dispatch(changeTodolistFilterAC(todolistId, 'Active'))

  }
  const completedOnClickHandler = () => {
    dispatch(changeTodolistFilterAC(todolistId, 'Completed'))
  }

  if (filter === 'Active') {
    tasks = tasks.filter(t => !t.isDone)
  }
  if (filter === 'Completed') {
    tasks = tasks.filter(t => t.isDone)
  }

  const onChangeTitleHandler = (tId: string, title: string) => {
   dispatch(changeTodolistTitleAC(tId, title))
  }
  const onChangeTodolistTitleHandler = (title: string) => {
    dispatch(changeTodolistTitleAC(todolistId, title))
  }

  const removeTodolistHandler = () => {
    dispatch(removeTodolistAC(todolistId))
  }


  return (
    <div className={t.todolist}>
      <h3><EditableSpan title={title} onChange={onChangeTodolistTitleHandler}/>
        <IconButton aria-label={'delete'} size={'small'} onClick={removeTodolistHandler}>
          <Delete/>
        </IconButton></h3>

      <AddItemForm todolistId={todolistId} addItem={addTitleTask}/>
      <div className={t.todolist__list}>
        {tasks.map(
          (task) => {

            const onDeleteHandler = () => {
              dispatch(removeTaskAC(todolistId, task.id))
            }
            // забираем данные в App , id и состояние isDone
            return (

                <div key={task.id} className={t.todolist__link}>
                  <CheckboxComponent isDone={task.isDone} callback={(isDone) => {
                    onCheckedHandler(task.id, isDone)
                  }}/>
                  {/*<SuperCheckbox isDone={task.isDone} callback={(isDone)=>{onCheckedHandler(task.id, isDone)}}/>*/}
                  <EditableSpan title={task.title} onChange={(title) => {
                    onChangeTitleHandler(task.id, title)
                  }}/>
                  {/*<button onClick={onDeleteHandler} className={t.todolist__link__button}>x</button>*/}
                  <IconButton aria-label={'delete'} size={'small'} onClick={onDeleteHandler}>
                    <Delete/>
                  </IconButton>
                </div>

            )

          }
        )}
      </div>
      <div>
        {/*Кнопки стилизованные Material UI*/}
        {/*<Button variant="contained" onClick={allOnClickHandler } >All</Button>*/}
        {/*<Button variant="contained" onClick={activeOnClickHandler} >Active</Button>*/}
        {/*<Button variant="contained" onClick={completedOnClickHandler} >Completed</Button>*/}


        <Button variant={filter === 'All' ? 'contained' : "text"}
                className={t.filterButton}
                onClick={allOnClickHandler}
                color={"primary"}>All
        </Button>
        <Button variant={filter === 'Active' ? 'contained' : "text"}
                className={t.filterButton}
                onClick={activeOnClickHandler}
                color={"primary"}>Active
        </Button>
        <Button variant={filter === 'Completed' ? 'contained' : "text"}
                className={t.filterButton}
                onClick={completedOnClickHandler}
                color={"primary"}>Completed
        </Button>
      </div>
    </div>
  //test commit
  );
};

