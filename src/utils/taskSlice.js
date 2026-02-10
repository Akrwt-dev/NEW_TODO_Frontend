import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
    name : "task",
    initialState : null,
    reducers:{
        addTask:(state,action)=>{
            return action.payload;
        }
    }
})

export const { addTask } = taskSlice.actions;

export default taskSlice.reducer;