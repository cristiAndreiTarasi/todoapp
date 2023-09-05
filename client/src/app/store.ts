import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../features/auth/slices/userSlice";
import authReducer, { initialState } from "../features/auth/slices/authSlice";
import taskReducer from "../features/tasks/taskSlice";

const preloadedState = {
    auth: initialState,
    user: {
        fName: "",
        lName: "",
        email: ""
    },
};

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        tasks: taskReducer,
    },
    preloadedState: preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store };