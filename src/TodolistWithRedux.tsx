import {AppRootStateType} from "./state/store";
import {useDispatch, useSelector} from "react-redux";
import { addTaskAC, removeTaskAC, taskChangeCheckedAC, taskChangeTitleAC } from "./state/tasks-reducer";
import { changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC } from "./state/todolist-reducer";
import {TasksType, TodolistType } from "./AppWithRedux";
import {EditableSpan} from "./components/EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {AddItemForm} from "./components/AddItemForm";
import {CheckboxComponent} from "./components/CheckboxComponent";
import t from './App.module.css'

export type TodolistPropsType = {
   todolist: TodolistType
}


export const TodolistWithRedux = ({todolist}: TodolistPropsType) => {

   const {id, title, filter} = todolist

   let tasks = useSelector<AppRootStateType, Array<TasksType>>(state => state.tasks[id])
   let dispatch = useDispatch()
   //Работа с тасками <-----------------------------------------------------------------

   const addTitleTask = (title: string) => {
      dispatch(addTaskAC(id, title))
   }
   //Забираем id и состояние такси в основную компоненту
   const onCheckedHandler = (tId: string, isDone: boolean) => {
      // props.taskChecked(props.todolistId, tId, isDone)
      dispatch(taskChangeCheckedAC(id, tId, isDone))
   }
   // Фильтрация по выполнению тасок
   const allOnClickHandler = () => {
       dispatch(changeTodolistFilterAC(id, 'All'))
   }
   const activeOnClickHandler = () => {
      dispatch(changeTodolistFilterAC(id, 'Active'))
   }
   const completedOnClickHandler = () => {
      dispatch(changeTodolistFilterAC(id, 'Completed'))
   }
   const onChangeTitleHandler = (tId: string, title: string) => {
      // props.taskTitleChange(props.todolistId, tId, title)
      dispatch(taskChangeTitleAC(id, tId, title))
   }
   const onChangeTodolistTitleHandler = (title: string) => {
      dispatch(changeTodolistTitleAC(id, title))
   }

   const removeTodolistHandler = () => {
      // props.deleteTodolist(props.todolistId)
      dispatch(removeTodolistAC(id))
   }

   if (filter === 'Active') {
      tasks = tasks.filter(t => !t.isDone)
   }
   if (filter === 'Completed') {
      tasks = tasks.filter(t => t.isDone)
   }

   return (
     <div className={t.todolist}>
        <h3><EditableSpan title={title} onChange={onChangeTodolistTitleHandler}/>
           <IconButton aria-label={'delete'} size={'small'} onClick={removeTodolistHandler}>
              <Delete/>
           </IconButton></h3>
        <AddItemForm todolistId={id} addItem={addTitleTask}/>
        <div className={t.todolist__list}>
           {tasks && tasks.map(
             (task) => {
                const onDeleteHandler = () => {
                   dispatch(removeTaskAC(id, task.id))
                }
                // забираем данные в App , id и состояние isDone
                return (

                     <li key={task.id} className={t.todolist__link}>
                        <CheckboxComponent isDone={task.isDone} callback={(isDone) => {
                           onCheckedHandler(task.id, isDone)
                        }}/>
                        <EditableSpan title={task.title} onChange={(title) => {
                           onChangeTitleHandler(task.id, title)
                        }}/>
                        <IconButton aria-label={'delete'} size={'small'} onClick={onDeleteHandler}>
                           <Delete/>
                        </IconButton>
                     </li>

                )

             }
           )}
        </div>
        <div>
           <Button variant={filter === 'All' ? 'contained' : "text"}
                   className={t.filterButton}
                   onClick={allOnClickHandler}
                   color={"primary"}>All
           </Button>
           <Button variant={filter === 'Active' ? 'contained' : "text"}
                   className={t.filterButton}
                   onClick={activeOnClickHandler}
                   color={"primary"}>Active
           </Button>
           <Button variant={filter === 'Completed' ? 'contained' : "text"}
                   className={t.filterButton}
                   onClick={completedOnClickHandler}
                   color={"primary"}>Completed
           </Button>
        </div>
     </div>

   );

};

