import React, {ChangeEvent, useState} from 'react';
import {FilterType, TasksType} from "../App";
import t from '../App.module.css'

export type TodolistPropsType = {
    title: string
    tasks: Array<TasksType>
    deleteTask: (idTask: string) => void
    changeFilter: (value: FilterType) => void
    addTask: (newTitle: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

    let [title, setTitle] = useState<string>('')


    let titleOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }


    let addChangeHandler = () => {
        {
            props.addTask(title)
        }
        setTitle('')
    }

    return (
        <div className={t.todolist}>
            <h3>{props.title}</h3>

            <div className={t.todolist__inputField}>
                <input className={t.inputField__input} value={title} onChange={titleOnChangeHandler}/>
                <button className={t.inputField__button} onClick={addChangeHandler}>+</button>
            </div>

            <ul className={t.todolist__list}>
                {props.tasks.map(
                    (task) => {

                        const onDeleteHandler = () => {
                            props.deleteTask(task.id)
                        }

                        return (
                            <>
                                <li key={task.id} className={t.todolist__link}>
                                    <input type="checkbox" checked={task.isDone}/><span>{task.title}</span>
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

