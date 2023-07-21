import {TaskStateType} from "../App";


const tasksReducer = (state: TaskStateType, action: tasksReducerType) => {
   switch (action.type) {
      case 'REMOVE-TASK': {
         // setTasks({...tasks, [todolistId]: tasks[todolistId].filter(d => d.id !== taskId)})
         return {...state, [action.payload.id]: action.payload}
      }

      default:
         return state
   }

}

type tasksReducerType = removeTaskACType

type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (id:string) => {
   return {
      type: 'REMOVE-TASK',
      payload: {
         id
      }
   } as const
}