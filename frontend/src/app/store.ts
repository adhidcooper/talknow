// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authService/AuthSlice';
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, authReducer)

const store = configureStore({
    reducer: {
        auth: persistedReducer,
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loginTrunk)
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
