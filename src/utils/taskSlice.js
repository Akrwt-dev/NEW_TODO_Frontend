import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
  },
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },

    addTask: (state, action) => {
      state.tasks.unshift(action.payload);
    },

    removeTask: (state, action) => {
      const idToRemove = action.payload;
      state.tasks = state.tasks.filter((task) => task._id !== idToRemove);
    },
  },
});

export const { setTasks, addTask, removeTask } = taskSlice.actions;
export default taskSlice.reducer;
