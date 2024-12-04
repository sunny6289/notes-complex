import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allNoteList: []
}



const allNotesSlice = createSlice({
    name: 'allNote',
    initialState: initialState,
    reducers: {
        addNote: (state, action)=>{
            state.allNoteList = [...state.allNoteList, 
                {
                    id: action.payload.id, 
                    noteTitle: action.payload.noteTitle, 
                    noteTags: [...action.payload.noteTags],
                    noteContent: action.payload.noteContent,
                    date: action.payload.date,
                    edited: false
                }]
        },
        deleteNote: (state, action)=>{
            state.allNoteList = state.allNoteList.filter((note)=> note.id !== action.payload )
        },
        editNote: (state, action)=>{
            state.allNoteList = state.allNoteList.map((note)=> note.id === action.payload.id ? {...action.payload, edited: true} : note)
        }
    }
})


export default allNotesSlice.reducer;
export const {addNote, deleteNote, editNote} = allNotesSlice.actions;