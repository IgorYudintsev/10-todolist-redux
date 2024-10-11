import {v1} from "uuid";
import {TasksStateType, TaskType} from '../AppWithReducer'
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";
import {useState} from "react";

const initialState: TasksStateType = {
    // todolistID1: [
    //     {id: v1(), title: 'HTML&CSS', isDone: true},
    //     {id: v1(), title: 'JS', isDone: true},
    //     {id: v1(), title: 'ReactJS', isDone: false},
    // ],
    // todolistID2: [
    //     {id: v1(), title: 'Rest API', isDone: true},
    //     {id: v1(), title: 'GraphQL', isDone: false},
    // ],
}

export const tasksReducer = (state = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            }
        }

        case "ADD-TASK": {
            const newTask: TaskType = {
                title: action.payload.title,
                isDone: false,
                id: v1()
            }
            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
        }

        case "CHANGE_TASK_STATUS": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
                    ...t, isDone: action.payload.taskStatus
                } : t)
            }
        }

        case "CHANGE_TASK_TITLE": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
                    ...t, title: action.payload.title
                } : t)
            }
        }

        case "ADD-TODOLIST":
            console.log(action.payload.todolistId)
            return {...state, [action.payload.todolistId]: []}

        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.payload.todolistId]
            return copyState
        }

        default:
            return state
        // throw new Error("I don't understand this type")
    }
}

// Action creators
export const removeTaskAC = (payload: { taskId: string, todolistId: string }) => {
    return {
        type: 'REMOVE-TASK',
        payload
    } as const
}

export const addTaskAC = (payload: { title: string, todolistId: string }) => {
    return {
        type: 'ADD-TASK',
        payload
    } as const
}

export const changeTaskStatusAC = (payload: { taskId: string, taskStatus: boolean, todolistId: string }) => {
    return {
        type: 'CHANGE_TASK_STATUS',
        payload
    } as const
}

export const changeTaskTitleAC = (payload: { taskId: string, title: string, todolistId: string }) => {
    return {
        type: 'CHANGE_TASK_TITLE',
        payload
    } as const
}


// Actions types
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
