import { combineReducers, configureStore } from "@reduxjs/toolkit";
import  allNotesReducer  from "./slices/all notes/allNotesSlice";
import authReducer from './slices/authentication/authSlice';

const rootReducer = combineReducers({
    allNote: allNotesReducer,
    auth: authReducer
})

export const store = configureStore({
    reducer: rootReducer, 
});