import apiClient from 'api/apiClient';
import {ENDPOINTS} from 'api/endpoints';

const MOVIES_BASE = ENDPOINTS.movies;

export const getGenres = () => apiClient(MOVIES_BASE.genres);
