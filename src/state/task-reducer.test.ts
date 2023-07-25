import {addTaskAC, removeTaskAC, taskChangeCheckedAC, taskChangeTitleAC, tasksReducer} from "./tasks-reducer";
import {TasksStateType} from "../AppWithReducers";
import {addTodolistAC} from "./todolist-reducer";

test('correct task should be deleted from correct array', () => {
   const startState: TasksStateType = {
      'todolistId1': [
         {id: '1', title: 'CSS', isDone: false},
         {id: '2', title: 'JS', isDone: true},
         {id: '3', title: 'React', isDone: false}
      ],
      'todolistId2': [
         {id: '1', title: 'bread', isDone: false},
         {id: '2', title: 'milk', isDone: true},
         {id: '3', title: 'tea', isDone: false}
      ]
   }

   const action = removeTaskAC('todolistId2', '2')

   const endState = tasksReducer(startState, action)

   expect(endState).toEqual({
      'todolistId1': [
         {id: '1', title: 'CSS', isDone: false},
         {id: '2', title: 'JS', isDone: true},
         {id: '3', title: 'React', isDone: false}
      ],
      'todolistId2': [
         {id: '1', title: 'bread', isDone: false},
         {id: '3', title: 'tea', isDone: false}
      ]
   })
})

test('correct task should be added to correct array', () => {
   const startState: TasksStateType = {
      'todolistId1': [
         {id: '1', title: 'CSS', isDone: false},
         {id: '2', title: 'JS', isDone: true},
         {id: '3', title: 'React', isDone: false}
      ],
      'todolistId2': [
         {id: '1', title: 'bread', isDone: false},
         {id: '2', title: 'milk', isDone: true},
         {id: '3', title: 'tea', isDone: false}
      ]
   }

   const action = addTaskAC('todolistId2','juice')

   const endState = tasksReducer(startState, action)

   expect(endState['todolistId1'].length).toBe(3)
   expect(endState['todolistId2'].length).toBe(4)
   expect(endState['todolistId2'][0].id).toBeDefined()
   expect(endState['todolistId2'][0].title).toBe('juice')
   expect(endState['todolistId2'][0].isDone).toBe(false)
})

test('status of specified task should be changed', () => {
   const startState: TasksStateType = {
      'todolistId1': [
         {id: '1', title: 'CSS', isDone: false},
         {id: '2', title: 'JS', isDone: true},
         {id: '3', title: 'React', isDone: false}
      ],
      'todolistId2': [
         {id: '1', title: 'bread', isDone: false},
         {id: '2', title: 'milk', isDone: true},
         {id: '3', title: 'tea', isDone: false}
      ]
   }

   const action = taskChangeCheckedAC('todolistId2','2', false )

   const endState = tasksReducer(startState, action)

   expect(endState['todolistId2'][1].isDone).toBe(false)
   expect(endState['todolistId1'][1].isDone).toBe(true)
})

test('title of specified task should be changed', ()=>{
   const startState: TasksStateType = {
      'todolistId1': [
         {id: '1', title: 'CSS', isDone: false},
         {id: '2', title: 'JS', isDone: true},
         {id: '3', title: 'React', isDone: false}
      ],
      'todolistId2': [
         {id: '1', title: 'bread', isDone: false},
         {id: '2', title: 'milk', isDone: true},
         {id: '3', title: 'tea', isDone: false}
      ]
   }

   const action = taskChangeTitleAC('todolistId1', '1', 'HTML+CSS')

   const endState = tasksReducer(startState, action)

   expect(endState['todolistId1'][0].title).toBe('HTML+CSS')
   expect(endState['todolistId2'][0].title).toBe('bread')
})

test('new array should be added when new todolist is added', () => {
   const startState: TasksStateType = {
      'todolistId1': [
         {id: '1', title: 'CSS', isDone: false},
         {id: '2', title: 'JS', isDone: true},
         {id: '3', title: 'React', isDone: false}
      ],
      'todolistId2': [
         {id: '1', title: 'bread', isDone: false},
         {id: '2', title: 'milk', isDone: true},
         {id: '3', title: 'tea', isDone: false}
      ]
   }

   const action = addTodolistAC('new todolist')

   const endState = tasksReducer(startState, action)


   const keys = Object.keys(endState)
   const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
   if (!newKey) {
      throw Error('new key should be added')
   }

   expect(keys.length).toBe(3)
   expect(endState[newKey]).toEqual([])
})