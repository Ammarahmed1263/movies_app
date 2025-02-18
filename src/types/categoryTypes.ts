export type MovieCategory =
  | 'now_playing'
  | 'popular'
  | 'top_rated'
  | 'upcoming'
  | 'trending';

export interface getMoviesByCategoryOptions {
  page?: number; // Optional for all categories
}

export interface TrendingFetchOptions extends getMoviesByCategoryOptions {
  time_window: 'day' | 'week'; // Required for trending category
}

export type FetchMoviesParams = {
  type: 'category' | 'genre';
  value: string;
  page?: number;
  time_window?: 'day' | 'week';
};
