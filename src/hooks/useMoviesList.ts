import {getMoviesList} from '@redux/movies';
import {RootState} from '@redux/types';
import {useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from './useRedux';

const defaultMoviesState = {
  movies: [],
  page: 0,
  total_pages: 0,
  loading: false,
  error: null,
};

export const useMoviesList = (
  type: 'category' | 'genre',
  value: string,
  time_window?: 'day' | 'week',
) => {
  const dispatch = useAppDispatch();
  const {movies, page, total_pages, loading, error} = useAppSelector(
    (state: RootState) =>
      state.movies[`${type}-${value}`] || defaultMoviesState,
  );

  useEffect(() => {
    if (movies.length === 0) {
      dispatch(getMoviesList({type, value, time_window, page: 1}));
    }
  }, [type, value, time_window, dispatch, movies]);

  const handlePagination = () => {
    if (page < total_pages && !loading) {
      dispatch(
        getMoviesList({
          type,
          value,
          time_window,
          page: page + 1,
        }),
      );
    }
  };

  const refetch = useCallback(() => {
    dispatch(getMoviesList({type, value, time_window, page: 1, reset: true}));
  }, [dispatch, type, value, time_window]);

  return {
    movies,
    loading,
    error,
    page,
    total_pages,
    handlePagination,
    refetch,
    hasMore: page < total_pages,
  };
};
