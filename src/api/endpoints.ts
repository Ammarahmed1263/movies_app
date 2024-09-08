export const ENDPOINTS = {
  movies: {
    now_playing: 'movie/now_playing',
    popular: 'movie/popular',
    top_rated: 'movie/top_rated',
    upcoming: 'movie/upcoming',
    search: 'search/movie',
    videos: (movieId: number) => `movie/${movieId}/videos`,
  },
  movieDetails: {
    details: (movieId: number) => `movie/${movieId}`,
    credits: (movieId: number) => `movie/${movieId}/credits`,
  },
  castMember: {
    details: (personId: number) => `person/${personId}`,
    movieCredits: (personId: number) => `person/${personId}/movie_credits`,
  }
};
