import { MovieArray } from "./movieTypes";

export type SearchResult = {
  loading: boolean;
  page: number;
  totalPages: number;
  searchResults: MovieArray;
};