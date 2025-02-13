import {
  getMoviesByCategoryOptions,
  MovieCategory,
  TrendingFetchOptions,
} from 'types/categoryTypes';
import apiClient from '../apiClient';
import {ENDPOINTS} from '../endpoints';

const MOVIES_BASE = ENDPOINTS.movies;

export function getMovies(
  category: 'trending',
  options: TrendingFetchOptions,
): Promise<any>;
export function getMovies(
  category: Exclude<MovieCategory, 'trending'>,
  options?: getMoviesByCategoryOptions,
): Promise<any>;

export async function getMovies(
  category: MovieCategory,
  options: getMoviesByCategoryOptions = {},
): Promise<any> {
  const {page = 1} = options;

  if (!(category in MOVIES_BASE)) {
    throw new Error('Unknown category');
  }

  let endpoint = MOVIES_BASE[category];

  if (category === 'trending') {
    const {time_window} = options as TrendingFetchOptions;

    if (!time_window) {
      throw new Error('time_window is required for trending movies');
    }
    endpoint += time_window;
  }

  return apiClient(endpoint, {page});
}

interface SearchMoviesParams {
  query: string;
  language?: string;
  page?: number;
  include_adult?: boolean;
  primary_release_year?: string;
  region?: string;
  year?: string;
}

export const searchMovies = ({
  query = '',
  page = 1,
  ...rest
}: SearchMoviesParams) => apiClient(MOVIES_BASE.search, {query, page, ...rest});
export const getMovieVideos = (movieId: number) =>
  apiClient(MOVIES_BASE.videos(movieId));
export const discoverMovies = (params: {}) =>
  apiClient(MOVIES_BASE.discover, params);
