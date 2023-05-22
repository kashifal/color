import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: {selectedTodo:{}, modal:false},
  reducers: {
    addTodo: (state, action) => {
      state.selectedTodo = action.payload; 
    },

    setModal: (state) => {
        state.modal = !state.modal; 
      },
  },
});

export const { addTodo , setModal } = todoSlice.actions; // Export the addTodo action
export default todoSlice.reducer;
