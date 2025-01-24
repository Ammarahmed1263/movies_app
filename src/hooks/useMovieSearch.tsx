// hooks/useMovieSearch.ts
import {useReducer, useCallback} from 'react';
import {searchMovies} from '@services/movieService';
import {Movie} from 'types/movieTypes';

type SearchState = {
  searchResults: Movie[];
  loading: boolean;
  page: number;
  total_pages: number;
};

const initialState: SearchState = {
  searchResults: [],
  loading: false,
  page: 1,
  total_pages: 1,
};

const reducer = (state: SearchState, action: any) => {
  switch (action.type) {
    case 'RESET_SEARCH':
      return {
        ...state,
        searchResults: [],
        page: 1,
        total_pages: 1,
      };
    case 'SET_RESULTS':
      return {
        ...state,
        searchResults: [...state.searchResults, ...action.payload.results],
        page: action.payload.page,
        total_pages: action.payload.total_pages,
        loading: false,
      };
    case 'SET_LOADING':
      return {...state, loading: true};
    case 'STOP_LOADING':
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export const useMovieSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSearch = useCallback(async (keyword: string, page: number) => {
    if (!keyword) return;

    dispatch({type: 'RESET_SEARCH'});
    const response = await searchMovies({query: keyword, page});
    dispatch({type: 'SET_RESULTS', payload: response});
  }, []);

  return {...state, handleSearch, dispatch};
};
