import React, {memo} from 'react';
import t from "../App.module.css";
import {CheckboxComponent} from "./CheckboxComponent";
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {TasksType} from "../AppWithRedux";
import {removeTaskAC, taskChangeCheckedAC, taskChangeTitleAC} from "../state/tasks-reducer";
import {useDispatch} from "react-redux";

type TaskPropsType = {
   task: TasksType
   todolistId: string
}

export const TaskWithRedux = memo(({task, todolistId}:TaskPropsType) => {

   const dispatch = useDispatch()

   const taskChangeStatusHandler = (tId: string, isDone: boolean) => {
      dispatch(taskChangeCheckedAC(todolistId, task.id, isDone))
   }

   const taskChangeTitleHandler = (tId: string, title: string) => {
      dispatch(taskChangeTitleAC(todolistId, task.id, title))
   }

   const removeTaskHandler = () => {
      dispatch(removeTaskAC(todolistId, task.id))
   }

   return (
     <li key={task.id} className={t.todolist__link}>
        <CheckboxComponent isDone={task.isDone} callback={(isDone) => {
           taskChangeStatusHandler(task.id, isDone)
        }}/>
        <EditableSpan title={task.title} onChange={(title) => {
           taskChangeTitleHandler(task.id, title)
        }}/>
        <IconButton aria-label={'delete'} size={'small'} onClick={removeTaskHandler}>
           <Delete/>
        </IconButton>
     </li>
   );
})

