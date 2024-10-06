import { useEffect } from 'react';
import { RootState } from '@redux/types';
import { useAppDispatch, useAppSelector } from './useRedux';
import { MovieCategory } from 'types/categoryTypes';
import { getMoviesByCategory } from '@redux/movies';

export const useMoviesByCategory = (category: MovieCategory, time_window?: 'day' | 'week') => {
  const dispatch = useAppDispatch();
  const {movies, page, total_pages, loading, error} = useAppSelector(
    (state: RootState) => state.movies[category],
  );

  useEffect(() => {
    if (movies.length === 0) {
      dispatch(getMoviesByCategory({ category, time_window, page: 1 }));
    }
  }, [category, time_window, dispatch, movies]);

  const handlePagination = () => {
    if (page < total_pages && !loading) {
      dispatch(getMoviesByCategory({ category, time_window, page: page + 1 }));
    }
  };

  return { movies, loading, error, handlePagination, hasMore: page < total_pages };
};
