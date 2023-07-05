import React, {ChangeEvent, useState} from 'react';
import {FilterType, TasksType} from "../App";
import t from '../App.module.css'
export type TodolistPropsType = {
    title: string
    tasks: Array<TasksType>
    deleteTask: (idTask: string) => void
    changeFilter: (value:FilterType) => void
    addTask: (newTitle:string) => void
}

export const Todolist = (props: TodolistPropsType) => {

    let [title, setTitle] = useState<string>('')

    // удаление таски
    const deleteOnclickHandler = () => {
    }
    let titleOnChangeHandler = (e:ChangeEvent<HTMLInputElement>) =>{
        setTitle(e.currentTarget.value)
    }

    let addChangeHandler = () => {
        {props.addTask(title)}
        setTitle('')
    }

    return (
        <div>
            <h3>{props.title}</h3>

            <div>
                <input value={title} onChange={titleOnChangeHandler}/>
                <button onClick={addChangeHandler}>+</button>
            </div>

            <ul>
                {props.tasks.map(
                    (task) => <li key={task.id}><input type="checkbox" checked={task.isDone}/> <span>{task.title}</span>
                        <button onClick={() => {
                            props.deleteTask(task.id)
                        }}>x
                        </button>
                    </li>
                )}
            </ul>
            <div>
                <button className={t.filterButton} onClick={() => {props.changeFilter('All')
                }}>All
                </button>
                <button className={t.filterButton} onClick={() => {props.changeFilter('Active')
                }}>Active
                </button>
                <button className={t.filterButton} onClick={() => {props.changeFilter('Completed')
                }}>Completed
                </button>
            </div>
        </div>

    );
};

