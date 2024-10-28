import {createAsyncThunk} from '@reduxjs/toolkit';
import {searchMovies} from '@services/movieService';

export const searchMoviesByKeyword = createAsyncThunk(
  'movies/searchMovies',
  async ({query, page = 1}: {query: string; page?: number}) => {
    const response = await searchMovies({query, page});
    console.log('response here: ', response);
    return response;
  },
);
