import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import userReducer from "./user/userSlice";

// Combine reducers
const rootReducer = combineReducers({
    user: userReducer
});

// Configure Redux Persist
const persistConfig = {
    key: "root",
    storage,
    version: 1
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

// Export the persistor
export const persistor = persistStore(store);
