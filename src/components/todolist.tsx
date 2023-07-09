import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType, TasksType} from "../App";
import t from '../App.module.css'
import Checkbox from "./checkbox";

export type TodolistPropsType = {
    title: string
    tasks: Array<TasksType>
    deleteTask: (idTask: string) => void
    changeFilter: (value: FilterType) => void
    addTask: (newTitle: string) => void
    taskChecked: (idTask: string, isDone: boolean) => void
}

export const Todolist = (props: TodolistPropsType) => {

    let [title, setTitle] = useState<string>('')

    let [error, setError] = useState<string>('')

    let titleOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError('')
    }

    let addTaskHandler = () => {
        if (title.trim() === '') {
            setError('Заполните поле ввода!')
            return
        }
        props.addTask(title.trim())
        setTitle('')
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('')
        if (e.keyCode === 13) {
            addTaskHandler()
        }
    }

    const onCheckedHandler = (tId:string, isDone:boolean) => {
        props.taskChecked(tId, isDone)
    }
    return (
        <div className={t.todolist}>
            <h3>{props.title}</h3>

            <div className={t.todolist__inputField}>
                <input className={t.inputField__input} value={title} onKeyDown={onKeyPressHandler}
                       onChange={titleOnChangeHandler}/>
                <button className={t.inputField__button} onClick={addTaskHandler}>+</button>
            </div>
            <div className={t.todolist__error}>
                {error && <div className={t.todolist__error_text}>{error}</div>}
            </div>
            <ul className={t.todolist__list}>
                {props.tasks.map(
                    (task) => {

                        const onDeleteHandler = () => {
                            props.deleteTask(task.id)
                        }
                        // забираем данные в App , id и состояние isDone


                        return (
                            <>
                                <li key={task.id} className={t.todolist__link}>
                                    <Checkbox isDone={task.isDone} callback={(isDone) => {
                                        onCheckedHandler(task.id, isDone)
                                    }}/>
                                    <span>{task.title}</span>
                                    <button onClick={onDeleteHandler} className={t.todolist__link__button}>x</button>
                                </li>
                            </>
                        )

                    }
                )}
            </ul>
            <div>
                <button className={t.filterButton} onClick={() => {
                    props.changeFilter('All')
                }}>All
                </button>
                <button className={t.filterButton} onClick={() => {
                    props.changeFilter('Active')
                }}>Active
                </button>
                <button className={t.filterButton} onClick={() => {
                    props.changeFilter('Completed')
                }}>Completed
                </button>
            </div>
        </div>

    );
};

