import React, {useReducer, useState} from 'react';
import './App.module.css';
import {TodolistWithRedux} from './TodolistWithRedux'
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
import {AppRootStateType} from "./state/store";
import {useDispatch, useSelector} from "react-redux";

export type TasksType = {
   id: string
   title: string
   isDone: boolean
}

export type FilterType = 'All' | 'Active' | 'Completed'

export type TodolistType = {
   todolistId: string
   title: string
   filter: FilterType
}

export type TasksStateType = {
   [key: string]: Array<TasksType>
}

export function AppWithRedux() {

   let todolistId1 = v1()
   let todolistId2 = v1()

   let todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
   //let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

   const dispatch = useDispatch()

   //Работа с тудулистом <-----------------------------------------------------------------
   const addTodolist = (title: string) => {
      const action = addTodolistAC(title)
      dispatch(action)
   }

   const todolistTitleChange = (todolistId: string, title: string) => {
      // setTodolist(todolist.map(f => f.id === todolistId ? {...f, title: title} : f))
      dispatch(changeTodolistTitleAC(todolistId, title))
   }
   const deleteTodolist = (todolistId: string) => {
      // setTodolist(todolist.filter(filteredTodolist => filteredTodolist.id !== todolistId))
      // delete tasks[todolistId]
      // setTasks({...tasks})
      dispatch(removeTodolistAC(todolistId))
   }
   const changeFilter = (todolistId: string, value: FilterType) => {
      // // setFilter(value)
      // setTodolist(todolist.map
      // (filtered => filtered.id === todolistId ? {...filtered, filter: value} : filtered))
      dispatch(changeTodolistFilterAC(todolistId, value))
   }
   //Работа с тасками <-----------------------------------------------------------------

   const addTask = (todolistId: string, newTitle: string) => {
      // let newTask = [{id: v1(), title: newTitle, isDone: false}, ...tasks]
      // setTasks(newTask)
      // let newTask = {id: v1(), title: newTitle, isDone: false}
      // setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
      dispatch(addTaskAC(todolistId, newTitle))

   }
   const deleteTask = (todolistId: string, taskId: string) => {
      // setTasks(tasks.filter(t => t.id !== idTask))
      // setTasks({...tasks, [todolistId]: tasks[todolistId].filter(d => d.id !== taskId)})
      dispatch(removeTaskAC(todolistId, taskId))
   }
   const taskChecked = (todolistId: string, idTask: string, isDone: boolean) => {
      // setTasks(tasks.map( t => t.id === idTask ? {...t, isDone: isDone}: t))
      // setTasks({
      //    ...tasks, [todolistId]: tasks[todolistId].map(checked => checked.id === idTask ? {
      //       ...checked, isDone: isDone
      //    } : checked)
      // })
      dispatch(taskChangeCheckedAC(todolistId, idTask, isDone))
   }
   const taskTitleChange = (todolistId: string, idTask: string, title: string) => {
      // setTasks({
      //    ...tasks, [todolistId]: tasks[todolistId].map(checked => checked.id === idTask ? {
      //       ...checked, title: title
      //    } : checked)
      // })
      dispatch(taskChangeTitleAC(todolistId, idTask, title))
   }

   return (
     // отрисовка тудулистов
     <div className="app">
        <Header/>
        <Container fixed>
           <Grid container style={{padding: '10px'}}>
              <AddItemForm addItem={addTodolist}/>
           </Grid>
           <Grid container spacing={4}>

              {todolists.map((mapping) => {
                 return (
                   <Grid key={mapping.todolistId} item>
                      <Paper style={{padding: '10px'}} elevation={5}>
                         <TodolistWithRedux
                         todolist={mapping}
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

