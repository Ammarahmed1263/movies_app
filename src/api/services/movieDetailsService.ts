import apiClient from "../apiClient";
import { ENDPOINTS } from "../endpoints";

const MOVIE_DETAILS = ENDPOINTS.movieDetails;

export const getMovieDetails = (movieId: number) => apiClient(MOVIE_DETAILS.details(movieId));
export const getMovieCredits = (movieId: number) => apiClient(MOVIE_DETAILS.credits(movieId));