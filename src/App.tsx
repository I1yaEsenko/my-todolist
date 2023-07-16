import React, {useState} from 'react';
import './App.module.css';
import {Todolist} from "./components/todolist";
import {v1} from "uuid";
import t from "./App.module.css";
import {AddItemForm} from "./components/AddItemForm";


export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterType = 'All' | 'Active' | 'Completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

export type TaskStateType = {
    [key: string]: Array<TasksType>
}

function App() {


    //local state for our data
    // let [tasks, setTasks] = useState<Array<TasksType>>([
    //         {id: v1(), title: "HTML&CSS", isDone: true},
    //         {id: v1(), title: "JS", isDone: true},
    //         {id: v1(), title: "ReactJS", isDone: false},
    //         {id: v1(), title: "Hello world", isDone: true},
    //         {id: v1(), title: "I am Happy", isDone: false},
    //         {id: v1(), title: "Yo", isDone: false},
    //     ]
    // )

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolist, setTodolist] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to do', filter: 'All'},
    ])

    let [tasks, setTasks] = useState<TaskStateType>({
            [todolistId1]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "Hello world", isDone: true},
                {id: v1(), title: "I am Happy", isDone: false},
                {id: v1(), title: "Yo", isDone: false},
            ],
            [todolistId2]: [
                {id: v1(), title: "Homework", isDone: true},
                {id: v1(), title: "Codewars", isDone: false},
                {id: v1(), title: "Do exams", isDone: false},
                {id: v1(), title: "Running", isDone: true},
                {id: v1(), title: "Working", isDone: false},
            ],
        }
    )

    //local state for filter
    // let [filter, setFilter] = useState<FilterType>('All')

    // let tasksForTodolist = tasks
    // let filterTasks = () => {
    //     tasksForTodolist = filter === 'Active' ? tasks.filter(t => t.isDone) :
    //         filter === 'Completed' ? tasks.filter(t => !t.isDone) :
    //             tasksForTodolist
    // }

    // фильтрация тасок
    // if (filter === 'Active') {
    //     tasksForTodolist = tasks.filter(t => !t.isDone)
    // }
    //
    // if (filter === 'Completed') {
    //     tasksForTodolist = tasks.filter(t => t.isDone)
    // }
    //Работа с тудулистами
    const addTodolist = (title: string) => {
        let newTodolistId = v1()
        setTodolist([{id: newTodolistId, title: title, filter: 'All'}, ...todolist])
        setTasks({...tasks, [newTodolistId]: []})
    }
    const todolistTitleChange = (todolistId: string, title: string) => {
        setTodolist(todolist.map(f => f.id === todolistId ? {...f, title: title} : f))
    }
    //работа с тасками

    const changeFilter = (todolistId: string, value: FilterType) => {
        // setFilter(value)
        setTodolist(todolist.map
        (filtered => filtered.id === todolistId ? {...filtered, filter: value} : filtered))
    }
    const addTask = (todolistId: string, newTitle: string) => {
        // let newTask = [{id: v1(), title: newTitle, isDone: false}, ...tasks]
        // setTasks(newTask)
        let newTask = {id: v1(), title: newTitle, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }
    const deleteTask = (todolistId: string, taskId: string) => {
        // setTasks(tasks.filter(t => t.id !== idTask))
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(d => d.id !== taskId)})

    }
    const taskChecked = (todolistId: string, idTask: string, isDone: boolean) => {
        // setTasks(tasks.map( t => t.id === idTask ? {...t, isDone: isDone}: t))
        setTasks({
            ...tasks, [todolistId]: tasks[todolistId].map(checked => checked.id === idTask ? {
                ...checked, isDone: isDone
            } : checked)
        })
    }

    const taskTitleChange = (todolistId: string, idTask: string, title: string) => {
        setTasks({
            ...tasks, [todolistId]: tasks[todolistId].map(checked => checked.id === idTask ? {
                ...checked, title: title
            } : checked)
        })
    }

    return (
        // отрисовка тудулистов
        <div className="app">

            <div className={t.todolist_add}>
                <AddItemForm addItem={addTodolist}/>
            </div>
            <div className={t.app__wrapper}>
                {todolist.map((mapTodolist) => {

                    let tasksForTodolist = tasks[mapTodolist.id]

                    if (mapTodolist.filter === 'Active') {
                        tasksForTodolist = tasks[mapTodolist.id].filter(t => !t.isDone)
                    }

                    if (mapTodolist.filter === 'Completed') {
                        tasksForTodolist = tasks[mapTodolist.id].filter(t => t.isDone)
                    }

                    return (
                        <Todolist
                            key={mapTodolist.id}
                            todolistId={mapTodolist.id}
                            title={mapTodolist.title}
                            tasks={tasksForTodolist}
                            deleteTask={deleteTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            taskChecked={taskChecked}
                            filter={mapTodolist.filter}
                            taskTitleChange={taskTitleChange}
                            todolistTitleChange={todolistTitleChange}
                        />
                    )
                })}
            </div>


        </div>
    );
}

export default App;
