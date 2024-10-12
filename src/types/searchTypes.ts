import { MovieArray } from "./movieTypes";

export type SearchResult = {
  loading: boolean;
  page: number;
  total_pages: number;
  searchResults: MovieArray;
};