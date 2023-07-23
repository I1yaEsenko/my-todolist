import {FilterType, TodolistType} from "../App";
import {v1} from "uuid";


export const todolistReducer = (state: Array<TodolistType>, action: TodolistReducerType) => {
   switch (action.type) {
      case "REMOVE-TODOLIST": {
         return state.filter(el => el.id !== action.payload.id)
      }
      case "ADD-TODOLIST": {
         let newTodolistId = v1()
         let newTodolist: TodolistType = {id:newTodolistId, title: action.payload.title, filter: 'All'}
         return [...state, newTodolist]
      }
      case "CHANGE-TODOLIST-TITLE": {
         return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)
      }
      case "CHANGE-TODOLIST-FILTER": {
         return state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.value}: el)
      }
      default:
         return state
   }
}

export type TodolistReducerType = RemoveTodolistACType | AddTodolistACType | changeTodolistTitleACType | changeTodolistFilterACType

type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (id: string) => {
   return {
      type: 'REMOVE-TODOLIST',
      payload: {id}
   } as const
}

type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => {
   return {
      type: 'ADD-TODOLIST',
      payload: {

         title
      }
   } as const
}

type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (id:string, title:string) => {
   return {
      type:'CHANGE-TODOLIST-TITLE',
      payload: {
         id,
         title
      }
   } as const


}

type changeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC = (id:string, value:FilterType) => {
   return {
      type: 'CHANGE-TODOLIST-FILTER',
      payload: {
         id,
         value
      }
   } as const
}