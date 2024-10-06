import { FetchMoviesOptions, MovieCategory, TrendingFetchOptions } from "types/categoryTypes";
import apiClient from "../apiClient";
import { ENDPOINTS } from "../endpoints";

const MOVIES_BASE = ENDPOINTS.movies;

export const getNowPlaying = (page: number = 1) => apiClient(MOVIES_BASE.now_playing, { page });
export const getPopular = (page: number = 1) => apiClient(MOVIES_BASE.popular, { page });
export const getTopRated = (page: number = 1) => apiClient(MOVIES_BASE.top_rated, { page });
export const getUpcoming = (page: number = 1) => apiClient(MOVIES_BASE.upcoming, { page });
export const getTrending = (time_window: "day" | "week" = "day", page: number = 1) => apiClient(MOVIES_BASE.trending + time_window, { page });


export function getMoviesByCategory(category: 'trending', options: TrendingFetchOptions): Promise<any>;
export function getMoviesByCategory(category: Exclude<MovieCategory, 'trending'>, options?: FetchMoviesOptions): Promise<any>;

export async function getMoviesByCategory(category: MovieCategory, options: FetchMoviesOptions = {}): Promise<any> {
  const { page = 1 } = options;

  if (!(category in MOVIES_BASE)) {
    throw new Error('Unknown category');
  }

  let endpoint = MOVIES_BASE[category];

  if (category === 'trending') {
    const { time_window } = options as TrendingFetchOptions;

    if (!time_window) {
      throw new Error('time_window is required for trending movies');
    }
    endpoint += time_window;
  }

  return apiClient(endpoint, { page });
}


interface SearchMoviesParams {
  query: string
  language?: string
  page?: number
  include_adult?: boolean
  primary_release_year?: string
  region?: string
  year?: string
}

export const searchMovies = ({query = '', page = 1, ...rest}: SearchMoviesParams) => apiClient(MOVIES_BASE.search, {query, page, ...rest});
export const getMovieVideos = (movieId: number) => apiClient(MOVIES_BASE.videos(movieId));