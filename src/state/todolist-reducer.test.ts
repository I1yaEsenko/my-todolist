import {
   addTodolistAC,
   changeTodolistFilterAC,
   changeTodolistTitleAC,
   removeTodolistAC,
   todolistReducer
} from './todolist-reducer';
import { v1 } from 'uuid'
import {FilterType, TodolistType} from '../App'

test('correct todolist should be removed', () => {
   let todolistId1 = v1()
   let todolistId2 = v1()

   const startState: Array<TodolistType> = [
      {id: todolistId1, title: 'What to learn', filter: 'All'},
      {id: todolistId2, title: 'What to buy', filter: 'All'}
   ]

   // const endState = todolistReducer(startState, {type: 'REMOVE-TODOLIST', id: todolistId1})
   const endState = todolistReducer(startState, removeTodolistAC(todolistId1))

   expect(endState.length).toBe(1)
   // @ts-ignore
   expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
   let todolistId1 = v1()
   let todolistId2 = v1()

   let newTodolistTitle = 'New Todolist'
   let newTodolistId = v1()

   const startState: Array<TodolistType> = [
      {id: todolistId1, title: 'What to learn', filter: 'All'},
      {id: todolistId2, title: 'What to buy', filter: 'All'}
   ]

   // const endState = todolistsReducer(startState, {type: 'ADD-TODOLIST', title: newTodolistTitle})
   const endState = todolistReducer(startState, addTodolistAC(newTodolistId, newTodolistTitle))
// @ts-ignore
   expect(endState.length).toBe(3)
   // @ts-ignore
   expect(endState[2].title).toBe(newTodolistTitle)
})

test('correct todolist should change its name', () => {
   let todolistId1 = v1()
   let todolistId2 = v1()

   let newTodolistTitle = 'New Todolist'

   const startState: Array<TodolistType> = [
      {id: todolistId1, title: 'What to learn', filter: 'All'},
      {id: todolistId2, title: 'What to buy', filter: 'All'}
   ]



   // const endState = todolistReducer(startState, action)
   const endState = todolistReducer(startState, changeTodolistTitleAC(todolistId2, newTodolistTitle))

   // @ts-ignore
   expect(endState[0].title).toBe('What to learn')
   // @ts-ignore
   expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
   let todolistId1 = v1()
   let todolistId2 = v1()

   let newFilter: FilterType = 'Completed'

   const startState: Array<TodolistType> = [
      {id: todolistId1, title: 'What to learn', filter: 'All'},
      {id: todolistId2, title: 'What to buy', filter: 'All'}
   ]

   const action = {
      type: 'CHANGE-TODOLIST-FILTER',
      id: todolistId2,
      filter: newFilter
   }

   // const endState = todolistsReducer(startState, action)
   const endState = todolistReducer(startState, changeTodolistFilterAC(todolistId2,newFilter ))
   // @ts-ignore
   expect(endState[0].filter).toBe('All')
   // @ts-ignore
   expect(endState[1].filter).toBe(newFilter)
})