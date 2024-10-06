import { createSlice } from "@reduxjs/toolkit";
import { MovieCategory } from "types/categoryTypes";
import { MovieCategoryState } from "./moviesTypes";
import { getMoviesByCategory } from "./moviesActions";

type intialState = {
  [key in MovieCategory]: MovieCategoryState;
};

const initialState: intialState = {
  now_playing: { movies: [], loading: false, page: 1, total_pages: 1, error: null },
  popular: { movies: [], loading: false, page: 1, total_pages: 1, error: null },
  top_rated: { movies: [], loading: false, page: 1, total_pages: 1, error: null },
  upcoming: { movies: [], loading: false, page: 1, total_pages: 1, error: null },
  trending: { movies: [], loading: false, page: 1, total_pages: 1, error: null },
}

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMoviesByCategory.pending, (state, action) => {
      const { category } = action.meta.arg;
      state[category] = { ...state[category], loading: true };
    })
    builder.addCase(getMoviesByCategory.fulfilled, (state, action) => {
      const {category, movies, page, total_pages, loading, error} = action.payload;
      state[category] = { movies: [...state[category].movies, ...movies], page, total_pages, loading, error };
      console.log('movies slice fullfilled: ', state, action)
    })
    builder.addCase(getMoviesByCategory.rejected, (state, action) => {
      const { category } = action.meta.arg;
      state[category].loading = false;
      state[category].error = action.error.message || 'Failed to fetch movies.';
    })
  }
})

export default moviesSlice.reducer;