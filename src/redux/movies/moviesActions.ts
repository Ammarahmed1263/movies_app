import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMovies } from "@services/movieService";
import { MovieCategory } from "types/categoryTypes";

export const getMoviesByCategory = createAsyncThunk(
  'movies/getMoviesByCategory',
  async ({category, page = 1, time_window}: {category: MovieCategory, page?: number, time_window?: 'day' | 'week'}) => {
    let response;

    if (category === 'trending') {
      if (!time_window) {
        throw new Error("time_window is required for trending movies");
      } 
      response = await getMovies(category, { page, time_window: time_window });
    } else {
      response = await getMovies(category, { page });
    }

    return {
      category,
      movies: response.results,
      page: response.page,
      total_pages: response.total_pages,
    };
})