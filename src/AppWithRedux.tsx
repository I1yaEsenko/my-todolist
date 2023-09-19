import React, {useReducer, useState} from 'react';
import './App.module.css';
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {Container, Grid, Paper} from "@mui/material";
import Header from "./components/Header";
import {
   addTodolistAC,
   changeTodolistFilterAC,
   changeTodolistTitleAC,
   removeTodolistAC,
} from "./state/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodolistWithRedux} from "./TodolistWithRedux";

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

export function AppWithRedux() {

   let todolistId1 = v1()
   let todolistId2 = v1()


   let todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
   const dispatch = useDispatch()
   //Работа с тудулистом <-----------------------------------------------------------------
   const addTodolist = (title: string) => {
      const action = addTodolistAC(title)
      dispatch(action)
   }

   const todolistTitleChange = (todolistId: string, title: string) => {
      // setTodolist(todolist.map(f => f.id === todolistId ? {...f, title: title} : f))
      // dispatchToTodolist(changeTodolistTitleAC(todolistId, title))
      dispatch(changeTodolistTitleAC(todolistId, title))
   }
   const deleteTodolist = (todolistId: string) => {
      // setTodolist(todolist.filter(filteredTodolist => filteredTodolist.id !== todolistId))
      // delete tasks[todolistId]
      // setTasks({...tasks})
      // dispatchToTodolist(removeTodolistAC(todolistId))
      // dispatchToTask(removeTodolistAC(todolistId))
      dispatch(removeTodolistAC(todolistId))
   }
   const changeFilter = (todolistId: string, value: FilterType) => {
      // // setFilter(value)
      // setTodolist(todolist.map
      // (filtered => filtered.id === todolistId ? {...filtered, filter: value} : filtered))
      // dispatchToTodolist(changeTodolistFilterAC(todolistId, value))
      dispatch(changeTodolistFilterAC(todolistId, value))
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
              {todolists.map((el) => {
                 return (
                   <Grid item key={el.id}>
                      <Paper style={{padding: '10px'}} elevation={5}>
                         <TodolistWithRedux
                           todolist={el}
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

