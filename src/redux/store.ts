import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { moviesReducer } from "./movies";
import { searchReducer } from "./search";

export const store = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    search: searchReducer
  },
});