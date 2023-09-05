import { PayloadAction, SliceCaseReducers, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TasksState, TaskType } from "./taskTypes";
import { fetchTasks, createNewTask, editTask, removeExistingTask } from "./taskThunks";

const initialState: TasksState = {
    tasks: [],
    editingTask: null,
    isLoading: false,
    error: null,
};

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        loadingFailed: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        setTasks: (state, action: PayloadAction<TasksState>) => action.payload,
        addTask: (state, action: PayloadAction<TaskType>) => { state.tasks.push(action.payload) },
        removeTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
        },
        setEditingTask: (state, action: PayloadAction<TaskType>) => { state.editingTask = action.payload },
        clearEditingTask: (state) => { state.editingTask = null },
    },
    extraReducers: builder => {
        // Handle fetchTasks thunk actions
        builder
            .addCase(fetchTasks.pending, state => {
                state.isLoading = true;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
        
        // Handle createNewTask thunk actions
        builder
            .addCase(createNewTask.pending, (state) => {
                state.isLoading = true;
            }).addCase(createNewTask.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tasks.push(action.payload);
            }).addCase(createNewTask.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });

        // Handle editTask thunk actions
        builder
            .addCase(editTask.pending, (state) => {
                state.isLoading = true;
            }).addCase(editTask.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.tasks.findIndex(task => task.id === action.payload.id);
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
            }).addCase(editTask.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });

        // Handle removeExistingTask thunk actions
        builder
            .addCase(removeExistingTask.pending, state => {
                state.isLoading = true;
            })
            .addCase(removeExistingTask.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tasks = state.tasks.filter(task => task.id !== action.payload);
            })
            .addCase(removeExistingTask.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    }
});

export const { setTasks, addTask, removeTask, startLoading, loadingFailed, setEditingTask, clearEditingTask } = taskSlice.actions;
export default taskSlice.reducer;