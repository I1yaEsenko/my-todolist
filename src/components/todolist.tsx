import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType, TasksType} from "../App";
import t from '../App.module.css'
import Checkbox from "./checkbox";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type TodolistPropsType = {

    todolistId: string
    title: string
    tasks: Array<TasksType>
    deleteTask: (todolistId:string, taskId: string) => void
    changeFilter: (todolistId:string, value: FilterType) => void
    addTask: (todolistId:string, newTitle: string) => void
    taskChecked: (todolistId:string, idTask: string, isDone: boolean) => void
    filter: string
    taskTitleChange: (todolistId:string, idTask: string, title:string) => void
}

export const Todolist = (props: TodolistPropsType) => {

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

    const addTitleTask = (title:string) => {
        props.addTask(props.todolistId, title)
    }
    //Забираем id и состояние такси в основную компоненту
    const onCheckedHandler = (tId: string, isDone: boolean) => {
        props.taskChecked(props.todolistId, tId, isDone)
    }
    // Фильтрация по выполнению тасок
    const allOnClickHandler = () => {
        props.changeFilter(props.todolistId,'All')
    }
    const activeOnClickHandler = () => {
        props.changeFilter(props.todolistId,'Active')
    }
    const completedOnClickHandler = () => {
        props.changeFilter(props.todolistId,'Completed')
    }
    const onChangeTitleHandler = (tId:string, title:string) => {
        props.taskTitleChange(props.todolistId, tId, title)
    }
    return (
        <div className={t.todolist}>
            <h3>{props.title}</h3>

            {/*<div className={t.todolist__inputField}>*/}
            {/*    <input className={t.inputField__input} value={title} onKeyDown={onKeyPressHandler}*/}
            {/*           onChange={titleOnChangeHandler}/>*/}
            {/*    <button className={t.inputField__button} onClick={addTaskHandler}>+</button>*/}
            {/*</div>*/}
            {/*<div className={t.todolist__error}>*/}
            {/*    {error && <div className={t.todolist__error_text}>{error}</div>}*/}
            {/*</div>*/}


            <AddItemForm todolistId={props.todolistId} addItem={addTitleTask}/>
            <ul className={t.todolist__list}>
                {props.tasks.map(
                    (task) => {

                        const onDeleteHandler = () => {
                            props.deleteTask(props.todolistId, task.id)
                        }
                        // забираем данные в App , id и состояние isDone
                        return (
                            <>
                                <li key={task.id} className={t.todolist__link}>
                                    <Checkbox isDone={task.isDone} callback={(isDone) => {
                                        onCheckedHandler(task.id, isDone)
                                    }}/>
                                    <EditableSpan title={task.title} onChange={(title) => {onChangeTitleHandler(task.id, title)}}/>
                                    <button onClick={onDeleteHandler} className={t.todolist__link__button}>x</button>
                                </li>
                            </>
                        )

                    }
                )}
            </ul>
            <div>
                <button className={t.filterButton} onClick={allOnClickHandler}>All
                </button>
                <button className={t.filterButton} onClick={activeOnClickHandler}>Active
                </button>
                <button className={t.filterButton} onClick={completedOnClickHandler}>Completed
                </button>
            </div>
        </div>

    );
};

