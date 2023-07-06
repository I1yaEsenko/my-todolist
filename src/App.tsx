import React, {useState} from 'react';
import './App.module.css';
import {Todolist} from "./components/todolist";
import {v1} from "uuid";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterType = 'All' | 'Active' | 'Completed'

function App() {

    //local state for our data
    let [tasks, setTasks] = useState<Array<TasksType>>([
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Hello world", isDone: true},
            {id: v1(), title: "I am Happy", isDone: false},
            {id: v1(), title: "Yo", isDone: false},
        ]
    )
    //local state for filter
    let [filter, setFilter] = useState<FilterType>('All')
    const deleteTask = (idTask: string) => {
        setTasks(tasks.filter(t => t.id !== idTask))
    }

    let tasksForTodolist = tasks
    // let filterTasks = () => {
    //     tasksForTodolist = filter === 'Active' ? tasks.filter(t => t.isDone) :
    //         filter === 'Completed' ? tasks.filter(t => !t.isDone) :
    //             tasksForTodolist
    // }


    // фильтрация тасок
    if (filter === 'Active') {
        tasksForTodolist = tasks.filter(t => !t.isDone)
    }

    if (filter === 'Completed') {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }
    let changeFilter = (value: FilterType) => {
        setFilter(value)
    }

    let addTask = (newTitle: string) => {
        let newTask = [{id: v1(), title: newTitle, isDone: false}, ...tasks]
        setTasks(newTask)
    }

    const taskChecked = (idTask: string, isDone: boolean) => {
        setTasks(tasks.map( t => t.id === idTask ? {...t, isDone: isDone}: t))
    }

    return (
        <div className="App">
            <Todolist title={'What to learn'}
                      tasks={tasksForTodolist}
                      deleteTask={deleteTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      taskChecked={taskChecked}/>
        </div>
    );
}

export default App;
