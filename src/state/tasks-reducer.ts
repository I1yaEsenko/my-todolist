import {TasksStateType, TasksType} from "../AppWithReducers";
import {v1} from "uuid";
import {AddTodolistACType, RemoveTodolistACType} from "./todolist-reducer";

export const tasksReducer = (state: TasksStateType, action: TaskReducerType) => {
   switch (action.type) {
      case "ADD-TASK":
         // let newTask : TasksType =
         return {...state, [action.payload.todolistId]: [{id: v1(), title: action.payload.title, isDone: false}, ...state[action.payload.todolistId]]}
      case "REMOVE-TASK":
         return {
            ...state,
            [action.payload.todolistId]: state[action.payload.todolistId].filter(f => f.id !== action.payload.id)
         }
      case "TASK-CHANGE-TITLE":
         return {
            ...state,
            [action.payload.todolistId]: state[action.payload.todolistId].map(
              tc => tc.id === action.payload.taskId ? {...tc, title: action.payload.title} : tc
            )
         }
      case "TASK-CHANGE-CHECKED": {
         return {
            ...state, [action.payload.todolistId]: state[action.payload.todolistId].map(
              check => check.id === action.payload.taskId ? {...check, isDone: action.payload.isDone} : check
            )
         }
      }
      case "ADD-TODOLIST": {
         return {...state, [action.payload.addTlId]: []}

      }
      case "REMOVE-TODOLIST": {
         let {[action.payload.id]: [], ...rest} = state
         return rest
      }
         return state
   }

}

export type TaskReducerType = addTaskACType |
  removeTaskACType |
  taskChangeTitleACType |
  taskChangeCheckedACType |
  AddTodolistACType | RemoveTodolistACType


type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistId: string, title: string) => {
   return {
      type: 'ADD-TASK',
      payload: {
         todolistId,
         title
      }
   } as const
}

type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistId: string, id: string) => {
   return {
      type: 'REMOVE-TASK',
      payload: {
         todolistId,
         id
      }
   } as const
}

type taskChangeTitleACType = ReturnType<typeof taskChangeTitleAC>
export const taskChangeTitleAC = (todolistId: string, taskId: string, title: string) => {
   return {
      type: 'TASK-CHANGE-TITLE',
      payload: {
         todolistId,
         taskId,
         title
      }
   } as const
}

type taskChangeCheckedACType = ReturnType<typeof taskChangeCheckedAC>
export const taskChangeCheckedAC = (todolistId: string, taskId: string, isDone: boolean) => {
   return {
      type: 'TASK-CHANGE-CHECKED',
      payload: {
         todolistId,
         taskId,
         isDone
      }
   } as const
}