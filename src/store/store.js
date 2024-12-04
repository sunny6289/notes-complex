import { combineReducers, configureStore } from "@reduxjs/toolkit";
import  allNotesReducer  from "./slices/all notes/allNotesSlice";
import  archivedNotesReducer  from "./slices/archived notes/archivedNotesSlice";
import authReducer from './slices/authentication/authSlice';

const rootReducer = combineReducers({
    allNote: allNotesReducer,
    archivedNote: archivedNotesReducer,
    auth: authReducer
})

export const store = configureStore({
    reducer: rootReducer, 
});