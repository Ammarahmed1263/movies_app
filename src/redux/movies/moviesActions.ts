import {createAsyncThunk} from '@reduxjs/toolkit';
import {discoverMovies, getMovies} from '@services/movieService';
import {FetchMoviesParams, MovieCategory} from 'types/categoryTypes';

export const getMoviesList = createAsyncThunk(
  'movies/getMoviesList',
  async ({type, value, page = 1, time_window}: FetchMoviesParams) => {
    let response;
    if (type === 'genre') {
      response = await discoverMovies({
        with_genres: value,
        page,
      });
    } else if (type === 'category') {
      if (value === 'trending') {
        if (!time_window) {
          throw new Error('time_window is required for trending movies');
        }
        response = await getMovies(value, {page, time_window: time_window});
      } else {
        response = await getMovies(
          value as 'now_playing' | 'popular' | 'top_rated' | 'upcoming',
          {page},
        );
      }
    }

    console.log(JSON.stringify(response, null, 4));
    return {
      type,
      value,
      movies: response.results,
      page: response.page,
      total_pages: response.total_pages,
    };
  },
);
