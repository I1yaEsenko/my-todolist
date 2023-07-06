import React, {ChangeEvent, useState} from 'react';
import {FilterType, TasksType} from "../App";
import t from '../App.module.css'

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


    let addChangeHandler = () => {
        if (title.trim() === '') {
          setError('Заполните поле ввода!')
            return
        }
        props.addTask(title.trim())
        setTitle('')
    }

    // checkbox


    return (
        <div className={t.todolist}>
            <h3>{props.title}</h3>

            <div className={t.todolist__inputField}>
                <input className={t.inputField__input} value={title} onChange={titleOnChangeHandler}/>
                <button className={t.inputField__button} onClick={addChangeHandler}>+</button>
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
                        let onCheckedHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.taskChecked(task.id, e.currentTarget.checked)
                        }

                        return (
                            <>
                                <li key={task.id} className={t.todolist__link}>
                                    <input className={t.todolist__checkbox} type="checkbox" onChange={onCheckedHandler}
                                           checked={task.isDone}/><span>{task.title}</span>
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

