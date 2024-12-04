import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuth: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        signIn: (state)=>{
            state.isAuth = true
        },
        signOut: (state)=>{
            state.isAuth = false
        }
    }
})


export default authSlice.reducer;
export const {signIn, signOut} = authSlice.actions;

