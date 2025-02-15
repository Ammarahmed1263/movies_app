export const ENDPOINTS = {
  movies: {
    now_playing: 'movie/now_playing',
    popular: 'movie/popular',
    top_rated: 'movie/top_rated',
    upcoming: 'movie/upcoming',
    trending: 'trending/movie/',
    search: 'search/movie',
    videos: (movieId: number) => `movie/${movieId}/videos`,
    discover: 'discover/movie',
    genres: 'genre/movie/list',
  },
  movieDetails: {
    details: (movieId: number) => `movie/${movieId}`,
    credits: (movieId: number) => `movie/${movieId}/credits`,
  },
  person: {
    popular: 'person/popular',
    details: (personId: number) => `person/${personId}`,
    movieCredits: (personId: number) => `person/${personId}/movie_credits`,
  },
};
