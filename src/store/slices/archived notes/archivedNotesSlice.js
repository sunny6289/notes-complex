import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    archivedNoteList: []
}

const archivedNotesSlice = createSlice({
    name: 'archivedNote',
    initialState: initialState,
    reducers: {
        archiveNote: (state, action)=>{
            state.archivedNoteList = [...state.archivedNoteList, 
                {
                    id: action.payload.id, 
                    noteTitle: action.payload.noteTitle, 
                    noteTags: [...action.payload.noteTags],
                    noteContent: action.payload.noteContent,
                    date: action.payload.date,
                    edited: action.payload.edited
                }]
        },
        removeArchivedNote: (state, action)=>{
            state.archivedNoteList = state.archivedNoteList.filter((note)=> note.id !== action.payload )
        },
        editArchivedNote: (state, action)=>{
            state.archivedNoteList = state.archivedNoteList.map((note)=> note.id === action.payload.id ? {...action.payload, edited: true} : note)
        }
    }
}) 


export default archivedNotesSlice.reducer;
export const {archiveNote, removeArchivedNote, editArchivedNote} = archivedNotesSlice.actions;