import {
  addFavorite,
  removeFavorite,
  setFavorites,
  setLoading,
} from '@redux/favoritesSlice';
import {
  addFavoriteMovie,
  getFavoriteMovies,
  removeFavoriteMovie,
} from '@services/userService';
import {cancelScheduledReminder, scheduleFavoriteReminder} from '@utils';
import {useCallback, useEffect} from 'react';
import {MovieSummary} from 'types/movieTypes';
import {useAppDispatch, useAppSelector} from './useRedux';

const useFavoriteMovies = () => {
  const {favorites, loading} = useAppSelector(state => state.favorites);
  const dispatch = useAppDispatch();

  const isFavoriteMovie = useCallback(
    (movieId: number) => favorites.some(movie => movie.id === movieId),
    [favorites],
  );

  const getUserFavorites = useCallback(
    async (forceRefresh = false) => {
      if (!forceRefresh && favorites.length > 0) return;

      dispatch(setLoading(true));
      try {
        const favoriteMovies = await getFavoriteMovies();
        dispatch(setFavorites(favoriteMovies));
      } catch (error) {
        console.error('Failed to fetch favorites:', error);
      } finally {
        dispatch(setLoading(false));
      }
    },
    [favorites.length],
  );

  const addMovieToFavorite = useCallback(async (movie: MovieSummary) => {
    dispatch(addFavorite(movie));

    try {
      await addFavoriteMovie({
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        poster_path: movie.poster_path,
      });
      scheduleFavoriteReminder({
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        poster_path: movie.poster_path,
      });
    } catch (error) {
      dispatch(removeFavorite(movie.id));
      console.log('failed to add movie to favorite', error);
    }
  }, []);

  const removeMovieFromFavorite = useCallback(async (movieId: number) => {
    const tempMovie = favorites.find(movie => movie.id === movieId);
    dispatch(removeFavorite(movieId));

    try {
      await removeFavoriteMovie(movieId);
      cancelScheduledReminder(movieId);
    } catch (error) {
      if (tempMovie) {
        dispatch(addFavorite(tempMovie));
      }
      console.log('failed to remove movie from favorite', error);
    }
  }, []);

  const toggleFavoriteMovie = useCallback(
    async (movie: MovieSummary) => {
      if (isFavoriteMovie(movie.id)) {
        await removeMovieFromFavorite(movie.id);
      } else {
        await addMovieToFavorite(movie);
      }
    },
    [isFavoriteMovie, addMovieToFavorite, removeMovieFromFavorite],
  );

  useEffect(() => {
    if (favorites.length === 0) {
      getUserFavorites();
    } else if (loading) {
      dispatch(setLoading(false));
    }
  }, []);

  return {
    favorites,
    loading,
    isFavoriteMovie,
    refreshFavorites: () => getUserFavorites(true),
    getUserFavorites,
    toggleFavoriteMovie,
    addMovieToFavorite,
    removeMovieFromFavorite,
  };
};

export default useFavoriteMovies;
