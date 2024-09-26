// src/features/auth/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login as loginAPI, signup as signupAPI, fetchUserInfo } from './authAPI';

interface AuthState {
    api_key: string | null;
    message: string | null;
    result: object | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    api_key: null,
    message: null,
    result: null,
    loading: false,
    error: null,
};

// Thunks for async actions
export const login =  createAsyncThunk('auth/login', async (credentials: { username: string; password: string }) => {
    const response = await loginAPI(credentials.username, credentials.password);
    return response;
});


export const signup = createAsyncThunk('auth/signup', async (userData: { username: string;  email: string; password: string}) => {
    const response = await signupAPI(userData.username, userData.email, userData.password);
    return response;
});

export const fetchUser = createAsyncThunk('auth/fetchUser', async (api_key: string) => {
    const response = await fetchUserInfo(api_key);
    return response;
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.api_key = null;
            state.message = null;
            state.result = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.api_key = action.payload.api_key
                state.result = action.payload
                state.message = action.payload.message
                state.loading = false;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Login failed';
            })
            .addCase(signup.fulfilled, (state, action) => {
                // Handle signup success if needed
                state.message = action.payload.message;
                state.loading = false;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.message = action.payload.message;
                state.result = action.payload.result;
            });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
