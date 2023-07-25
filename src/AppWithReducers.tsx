import React, {useReducer, useState} from 'react';
import './App.module.css';
import {Todolist} from "./todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {Container, Grid, Paper} from "@mui/material";
import Header from "./components/Header";

import {addTaskAC, removeTaskAC, taskChangeCheckedAC, taskChangeTitleAC, tasksReducer} from "./state/tasks-reducer";
import {
   addTodolistAC,
   changeTodolistFilterAC,
   changeTodolistTitleAC,
   removeTodolistAC,
   todolistReducer, TodolistReducerType
} from "./state/todolist-reducer";

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

export type TasksStateType = {
   [key: string]: Array<TasksType>
}

export function AppWithReducers() {

   let todolistId1 = v1()
   let todolistId2 = v1()

   let [todolist, dispatchToTodolist] = useReducer(todolistReducer, [
      {id: todolistId1, title: 'What to learn', filter: 'All'},
      {id: todolistId2, title: 'What to do', filter: 'All'},
   ])

   let [tasks, dispatchToTask] = useReducer(tasksReducer, {
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
           {id: v1(), title: "Code wars", isDone: false},
           {id: v1(), title: "Do exams", isDone: false},
           {id: v1(), title: "Running", isDone: true},
           {id: v1(), title: "Working", isDone: false},
        ],
     }
   )
   //Работа с тудулистом <-----------------------------------------------------------------
   const addTodolist = (title: string) => {
      // setTodolist([{id: newTodolistId, title: title, filter: 'All'}, ...todolist])
      // setTasks({...tasks, [newTodolistId]: []})
      dispatchToTodolist(addTodolistAC(title))
      dispatchToTask(addTodolistAC(title))
   }

   const todolistTitleChange = (todolistId: string, title: string) => {
      // setTodolist(todolist.map(f => f.id === todolistId ? {...f, title: title} : f))
      dispatchToTodolist(changeTodolistTitleAC(todolistId, title))
   }
   const deleteTodolist = (todolistId: string) => {
      // setTodolist(todolist.filter(filteredTodolist => filteredTodolist.id !== todolistId))
      // delete tasks[todolistId]
      // setTasks({...tasks})
      dispatchToTodolist(removeTodolistAC(todolistId))
      dispatchToTask(removeTodolistAC(todolistId))
   }
   const changeFilter = (todolistId: string, value: FilterType) => {
      // // setFilter(value)
      // setTodolist(todolist.map
      // (filtered => filtered.id === todolistId ? {...filtered, filter: value} : filtered))
      dispatchToTodolist(changeTodolistFilterAC(todolistId, value))
   }
   //Работа с тасками <-----------------------------------------------------------------

   const addTask = (todolistId: string, newTitle: string) => {
      // let newTask = [{id: v1(), title: newTitle, isDone: false}, ...tasks]
      // setTasks(newTask)
      // let newTask = {id: v1(), title: newTitle, isDone: false}
      // setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
      dispatchToTask(addTaskAC(todolistId, newTitle))

   }
   const deleteTask = (todolistId: string, taskId: string) => {
      // setTasks(tasks.filter(t => t.id !== idTask))
      // setTasks({...tasks, [todolistId]: tasks[todolistId].filter(d => d.id !== taskId)})
      dispatchToTask(removeTaskAC(todolistId, taskId))
   }
   const taskChecked = (todolistId: string, idTask: string, isDone: boolean) => {
      // setTasks(tasks.map( t => t.id === idTask ? {...t, isDone: isDone}: t))
      // setTasks({
      //    ...tasks, [todolistId]: tasks[todolistId].map(checked => checked.id === idTask ? {
      //       ...checked, isDone: isDone
      //    } : checked)
      // })
      dispatchToTask(taskChangeCheckedAC(todolistId, idTask, isDone))
   }
   const taskTitleChange = (todolistId: string, idTask: string, title: string) => {
      // setTasks({
      //    ...tasks, [todolistId]: tasks[todolistId].map(checked => checked.id === idTask ? {
      //       ...checked, title: title
      //    } : checked)
      // })
      dispatchToTask(taskChangeTitleAC(todolistId, idTask, title))
   }

   console.log(todolist)
   console.log(tasks)
   return (
     // отрисовка тудулистов
     <div className="app">
        <Header/>
        <Container fixed>
           <Grid container style={{padding: '10px'}}>
              <AddItemForm addItem={addTodolist}/>
           </Grid>
           <Grid container spacing={4}>

              {todolist.map((mapping) => {
                 let tasksForTodolist = tasks[mapping.id]
                 if (mapping.filter === 'Active') {
                    tasksForTodolist = tasks[mapping.id].filter(t => !t.isDone)
                 }
                 if (mapping.filter === 'Completed') {
                    tasksForTodolist = tasks[mapping.id].filter(t => t.isDone)
                 }
                 return (
                   <Grid item>
                      <Paper style={{padding: '10px'}} elevation={5}>
                         <Todolist
                           key={mapping.id}
                           todolistId={mapping.id}
                           title={mapping.title}
                           tasks={tasksForTodolist}
                           deleteTask={deleteTask}
                           changeFilter={changeFilter}
                           addTask={addTask}
                           taskChecked={taskChecked}
                           filter={mapping.filter}
                           taskTitleChange={taskTitleChange}
                           todolistTitleChange={todolistTitleChange}
                           deleteTodolist={deleteTodolist}
                         />
                      </Paper>
                   </Grid>
                 )
              })
              }
           </Grid>
        </Container>


     </div>
   );
}

