import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuth: false,
    userInfo: {}
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        userIn: (state, action)=>{
            state.isAuth = true;
            state.userInfo = {...action.payload};
        },
        userOut: (state)=>{
            state.isAuth = false,
            state.userInfo = {}
        }
    }
})


export default authSlice.reducer;
export const {userIn, userOut} = authSlice.actions;

