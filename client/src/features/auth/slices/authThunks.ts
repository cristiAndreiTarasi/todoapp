import { createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser, loginUser } from "../api";

export const registerThunk = createAsyncThunk(
    'auth/register',
    async (userData: { fName: string, lName: string, email: string, password: string }, thunkAPI) => {
        try {
            const response = await registerUser(userData.fName, userData.lName, userData.email, userData.password);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue('Registration failed');
        }
    }
);

export const loginThunk = createAsyncThunk(
    'auth/login',
    async (credentials: { email: string, password: string }, thunkAPI) => {
        try {
            const response = await loginUser(credentials.email, credentials.password);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue('Login failed');
        }
    }
);