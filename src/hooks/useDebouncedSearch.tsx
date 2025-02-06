import {useReducer, useCallback, useEffect, useState} from 'react';
import {searchMovies} from '@services/movieService';
import {Movie} from 'types/movieTypes';
import {Reducer} from '@reduxjs/toolkit';

type SearchState = {
  results: Movie[];
  status: 'idle' | 'searching' | 'paginating' | 'empty' | 'error';
  page: number;
  hasMore: boolean;
  error: string | null;
};

type SearchAction =
  | {type: 'START_SEARCH'}
  | {type: 'START_PAGINATION'}
  | {
      type: 'SEARCH_SUCCESS';
      payload: {results: Movie[]; page: number; total_pages: number};
    }
  | {type: 'SEARCH_ERROR'; payload: {msg: string}}
  | {type: 'RESET_SEARCH'};

const initialState: SearchState = {
  results: [],
  status: 'idle' as SearchState['status'],
  page: 1,
  hasMore: false,
  error: null,
};

const reducer: Reducer<SearchState, SearchAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case 'START_SEARCH':
      return {
        ...state,
        results: [],
        status: 'searching',
      };
    case 'START_PAGINATION':
      return {
        ...state,
        status: 'paginating',
      };
    case 'SEARCH_SUCCESS':
      return {
        ...state,
        results:
          action.payload.page === 1
            ? action.payload.results
            : [...state.results, ...action.payload.results],
        page: action.payload.page,
        status: action.payload.results.length ? 'idle' : 'empty',
        hasMore: action.payload.page < action.payload.total_pages,
      };
    case 'SEARCH_ERROR':
      return {
        ...state,
        error: action.payload.msg,
      };
    case 'RESET_SEARCH':
      return initialState;
    default:
      return state;
  }
};

const useDebouncedSearch = (keyword: string) => {
  const [state, dispatch] = useReducer<Reducer<SearchState, SearchAction>>(
    reducer,
    initialState,
  );

  const handleSearch = useCallback(
    async (keyword: string, page: number = 1) => {
      if (!keyword) {
        dispatch({type: 'RESET_SEARCH'});
        return;
      }

      dispatch({type: page === 1 ? 'START_SEARCH' : 'START_PAGINATION'});
      try {
        const response = await searchMovies({query: keyword, page});
        dispatch({type: 'SEARCH_SUCCESS', payload: response});
      } catch (error: any) {
        dispatch({type: 'SEARCH_ERROR', payload: {msg: error.message}});
      }
    },
    [],
  );

  const loadMore = useCallback(() => {
    if (state.hasMore && state.status !== 'paginating') {
      handleSearch(keyword, state.page + 1);
    }
  }, [state.hasMore, state.status, state.page, keyword, handleSearch]);

  useEffect(() => {
    state.page === 1 && dispatch({type: 'START_SEARCH'}); // to show searching immediately after first letter typed

    const debounceTimer = setTimeout(() => {
      if (keyword) {
        handleSearch(keyword, 1);
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [keyword, handleSearch]);

  return {...state, loadMore};
};

export default useDebouncedSearch;
