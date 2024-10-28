import { MovieArray } from "types/movieTypes";

export type intialState = {
  results: MovieArray,
  loading: boolean,
  page: number,
  total_pages: number,
};