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

  const getUserFavorites = useCallback(async () => {
    const favoriteMovies = await getFavoriteMovies();
    console.log('api response: ', favoriteMovies);
    dispatch(setFavorites(favoriteMovies));
  }, []);

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
      console.log(error);
    }
  }, []);

  const removeMovieFromFavorite = useCallback(async (movieId: number) => {
    dispatch(removeFavorite(movieId));
    try {
      await removeFavoriteMovie(movieId);
      cancelScheduledReminder(movieId);
    } catch (error) {
      dispatch(addFavorite(movieId));
      console.log(error);
    }
  }, []);

  const toggleFavoriteMovie = useCallback(
    async (movie: MovieSummary) => {
      try {
        const isCurrentlyFavorite = isFavoriteMovie(movie.id);
        if (isCurrentlyFavorite) {
          await removeMovieFromFavorite(movie.id);
        } else {
          await addMovieToFavorite({
            id: movie.id,
            title: movie.title,
            overview: movie.overview,
            poster_path: movie.poster_path,
          });
        }
      } catch (err) {
        console.error('Toggle favorite error:', err);
      }
    },
    [favorites],
  );

  useEffect(() => {
    console.log('favorites effect ran here: ', favorites.length);
    if (favorites.length === 0) {
      getUserFavorites();
    } else {
      dispatch(setLoading(false));
    }
  }, []);

  return {
    favorites,
    loading,
    isFavoriteMovie,
    getUserFavorites,
    toggleFavoriteMovie,
    addMovieToFavorite,
    removeMovieFromFavorite,
  };
};

export default useFavoriteMovies;
