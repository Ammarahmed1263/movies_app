export const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MTVjMDE0NjIxZGNlNGNhNGYzMzI2NWQ2MzA5ZmZhMiIsInN1YiI6IjY1MjY2MGZmZmQ2MzAwNWQ3YjI3MjViZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9c-Qit7_k7d4XANLn3OS2uBhB2VqpZKoGqMZUtgw3fc';

export const MOVIE_BASE_URL = 'https://api.themoviedb.org/3/'
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/'

export enum imagePlaceHolder {
  PERSON = require('../assets/images/person_placeholder.png'),
  MOVIE = require('../assets/images/movie_placeholder.png'),
}

export const emailRegex =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;