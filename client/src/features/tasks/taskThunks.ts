import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTasks, createTask, deleteTask, updateTask } from "./api";
import { TaskType } from "./taskTypes";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async (_, thunkAPI) => {
    try {
        const tasks = await getTasks();
        return tasks;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const createNewTask = createAsyncThunk("tasks/createNewTask", async ({ title, description, createDate }: Omit<TaskType, "id">, thunkAPI) => {
    try {
        const newTask = await createTask({ title, description, createDate });
        return newTask;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const editTask = createAsyncThunk("tasks/editTask", async (taskData: TaskType, thunkAPI) => {
    try {
        const updatedTask = await updateTask(taskData);
        return updatedTask;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const removeExistingTask = createAsyncThunk("tasks/removeExistingTask", async (taskId: string, thunkAPI) => {
    try {
        await deleteTask(taskId);
        return taskId;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

