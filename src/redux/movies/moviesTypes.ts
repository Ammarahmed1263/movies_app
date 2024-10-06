import { MovieArray } from "types/movieTypes";

export type MovieCategoryState = { 
  movies: MovieArray;
  loading: boolean;
  page: number;
  total_pages: number;
  error: string | null;
}