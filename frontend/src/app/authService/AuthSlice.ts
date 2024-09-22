// src/features/auth/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login as loginAPI, signup as signupAPI, fetchUserInfo } from './authAPI';

interface AuthState {
    apiKey: string | null;
    user: any | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    apiKey: null,
    user: null,
    loading: false,
    error: null,
};

// Thunks for async actions
export const login = createAsyncThunk('auth/login', async (credentials: { username: string; password: string }) => {
    const response = await loginAPI(credentials.username, credentials.password);
    return response;
});

export const signup = createAsyncThunk('auth/signup', async (userData: { username: string; password: string; email: string }) => {
    const response = await signupAPI(userData.username, userData.password, userData.email);
    return response;
});

export const fetchUser = createAsyncThunk('auth/fetchUser', async (apiKey: string) => {
    const response = await fetchUserInfo(apiKey);
    return response;
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.apiKey = null;
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.apiKey = action.payload.api_key;
                state.loading = false;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Login failed';
            })
            .addCase(signup.fulfilled, (state) => {
                // Handle signup success if needed
                state.loading = false;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.user = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
