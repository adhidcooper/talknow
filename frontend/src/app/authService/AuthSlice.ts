import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login as loginAPI, signup as signupAPI, fetchUserInfo } from './authAPI';

interface AuthState {
    api_key: string | null;
    message: string | null;
    result: object | null; // Change to Record for better typing
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    api_key: null,
    message: null,
    result: {},
    loading: false,
    error: null,
};

// Thunks for async actions
export const login = createAsyncThunk('auth/login', async (credentials: { username: string; password: string }) => {
    const response = await loginAPI(credentials.username, credentials.password);
    // Ensure response is serializable
    return {
        api_key: response.api_key,
        message: response.message,
        authenticated: response.authenticated // Ensure result is a plain object
    };
});

export const signup = createAsyncThunk('auth/signup', async (userData: { username: string; email: string; password: string }) => {
    const response = await signupAPI(userData.username, userData.email, userData.password);
    return {
        message: response.message,
    };
});

export const fetchUser = createAsyncThunk('auth/fetchUser', async (api_key: string) => {
    const response = await fetchUserInfo(api_key);
    return {
        message: response.message,
        result: { ...response.result },
    };
});


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            // Reset state to initial values
            state.api_key = null;
            state.message = null;
            state.result = null;
            state.loading = false;
            state.error = null; // Clear error as well
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.api_key = action.payload.api_key;
                state.result = action.payload.result; // Expect this to be a plain object
                state.message = action.payload.message;
                state.loading = false;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Login failed';
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.message = action.payload.message;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.message = action.payload.message;
                state.result = action.payload.result; // Ensure this is a plain object
            });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
