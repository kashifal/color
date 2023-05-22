import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice"; // Import the todoReducer, not todoSlice

export const store = configureStore({
  reducer: {
    selected: todoReducer, // Pass todoReducer as the reducer value
  },
});
