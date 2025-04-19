import {createSlice} from '@reduxjs/toolkit';
import {removeDuplicateMovies} from '@utils';
import {MovieArray} from 'types/movieTypes';
import {getMoviesList} from './moviesActions';

interface MoviesListState {
  movies: MovieArray;
  page: number;
  total_pages: number;
  error: string | null;
  loading: boolean;
}

type MoviesState = {
  [key: string]: MoviesListState;
};

const initialState: MoviesState = {};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getMoviesList.pending, (state, action) => {
      const {type, value} = action.meta.arg;
      const key = `${type}-${value}`;

      if (!state[key]) {
        state[key] = {
          movies: [],
          page: 0,
          total_pages: 0,
          loading: false,
          error: null,
        };
      }

      state[key].loading = true;
    });
    builder.addCase(getMoviesList.fulfilled, (state, action) => {
      const {type, value, page, movies, reset = false} = action.payload;
      const key = `${type}-${value}`;

      if (!state[key]) {
        state[key] = {
          movies: [],
          page: 0,
          total_pages: 1,
          error: null,
          loading: false,
        };
      }

      state[key].movies = reset
        ? movies
        : removeDuplicateMovies([...state[key].movies, ...movies]);
      state[key].page = page;
      state[key].total_pages = action.payload.total_pages;
      state[key].loading = false;
      state[key].error = null;
    });
    builder.addCase(getMoviesList.rejected, (state, action) => {
      const {type, value} = action.meta.arg;
      const key = `${type}-${value}`;

      if (!state[key]) {
        state[key] = {
          movies: [],
          page: 0,
          total_pages: 0,
          loading: false,
          error: null,
        };
      }

      state[key].loading = false;
      state[key].error = action.error.message || 'Failed to fetch movies.';
    });
  },
});

export default moviesSlice.reducer;
