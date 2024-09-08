import apiClient from "../apiClient";
import { ENDPOINTS } from "../endpoints";

const MOVIES_BASE = ENDPOINTS.movies;

export const getNowPlaying = (page: number = 1) => apiClient(MOVIES_BASE.now_playing, { page });
export const getPopular = (page: number = 1) => apiClient(MOVIES_BASE.popular, { page });
export const getTopRated = (page: number = 1) => apiClient(MOVIES_BASE.top_rated, { page });
export const getUpcoming = (page: number = 1) => apiClient(MOVIES_BASE.upcoming, { page });

interface SearchMoviesParams {
  query: string
  page: number
  include_adult?: boolean
  language?: string
  primary_release_year?: string
  region?: string
  year?: string
}

export const searchMovies = ({query = '', page = 1, ...rest}: SearchMoviesParams) => apiClient(MOVIES_BASE.search, {query, page, ...rest});
export const getMovieVideos = (movieId: number) => apiClient(MOVIES_BASE.videos(movieId));