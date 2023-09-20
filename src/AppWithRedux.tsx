import React, {useCallback, useReducer, useState} from 'react';
import './App.module.css';
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {Container, Grid, Paper} from "@mui/material";
import Header from "./components/Header";

import {
   addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC,

} from "./state/todolist-reducer";
import {AppRootStateType} from "./state/store";
import {TodolistWithRedux} from "./TodolistWithRedux";
import {useDispatch, useSelector} from "react-redux";

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
   const addTodolist = useCallback((title: string) => {
      const action = addTodolistAC(title)
      dispatch(action)
   }, [dispatch])

   // const todolistTitleChange = (todolistId: string, title: string) => {
   //    dispatch(changeTodolistTitleAC(todolistId, title))
   // }
   // const deleteTodolist = (todolistId: string) => {
   //    dispatch(removeTodolistAC(todolistId))
   // }
   // const changeFilter = (todolistId: string, value: FilterType) => {
   //    dispatch(changeTodolistFilterAC(todolistId, value))
   // }

   //Работа с тасками <-----------------------------------------------------------------
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
                   <Grid key={mapping.id} item>
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

