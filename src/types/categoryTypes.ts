export type MovieCategory = 'now_playing' | 'popular' | 'top_rated' | 'upcoming' | 'trending';

export interface FetchMoviesOptions {
  page?: number; // Optional for all categories
}

export interface TrendingFetchOptions extends FetchMoviesOptions {
  time_window: 'day' | 'week'; // Required for trending category
}