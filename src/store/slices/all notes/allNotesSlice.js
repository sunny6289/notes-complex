import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allNoteList: []
}



const allNotesSlice = createSlice({
    name: 'allNote',
    initialState: initialState,
    reducers: {
        addNote: (state, action)=>{
            state.allNoteList = [...state.allNoteList, {...action.payload}]
        },
        deleteNote: (state, action)=>{
            state.allNoteList = state.allNoteList.filter((note)=> note.id !== action.payload )
        },
        editNote: (state, action)=>{
            state.allNoteList = state.allNoteList.map((note)=> note.id === action.payload.id ? {...action.payload, edited: true} : note)
        },
        archiveNote: (state, action)=>{
            state.allNoteList = state.allNoteList.map((note)=> note.id === action.payload.id ? {...action.payload, isArchived: true} : note)
        },
        unarchiveNote: (state, action)=>{
            state.allNoteList = state.allNoteList.map((note)=> note.id === action.payload.id ? {...action.payload, isArchived: false} : note)
        },
        seedAllNote: (state, action)=> {
            state.allNoteList = [...action.payload]
        }
    }
})


export default allNotesSlice.reducer;
export const {addNote, deleteNote, editNote, seedAllNote, archiveNote, unarchiveNote} = allNotesSlice.actions;