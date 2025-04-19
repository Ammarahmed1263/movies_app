import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Movie, MovieSummary} from 'types/movieTypes';
import {deleteUserFolder} from './cloudinaryService';

export const getCurrentUserId = () => {
  return auth().currentUser?.uid;
};

export const getUserProfile = async () => {
  const userId = getCurrentUserId();
  if (!userId) {
    return null;
  }

  try {
    const user = await firestore().collection('users').doc(userId).get();
    return user.data() || {};
  } catch (e) {
    console.log('firestore: error fetching user profile', e);
    throw e;
  }
};

export const deleteUser = async () => {
  try {
    await deleteUserFolder(`users/${getCurrentUserId()}`);
    const user = auth().currentUser;
    console.log('USER: ', user);

    if (!user) {
      console.log('No user is currently signed in.');
      return;
    }

    await user.delete();
    console.log('User delete successfully!');
  } catch (e: any) {
    console.log('firestore: error deleting user', e.code, e.message);
    throw e;
  }
};

export const updateUserPreferences = async (preferences: any) => {
  const userId = getCurrentUserId();

  try {
    await firestore()
      .collection('users')
      .doc(userId)
      .update({
        ...Object.keys(preferences).reduce(
          (acc: Record<string, string>, key) => {
            acc[`userPreferences.${key}`] = preferences[key];
            return acc;
          },
          {},
        ),
      });
  } catch (e) {
    console.log('firestore: error updating user profile', e);
    throw e;
  }
};

export const setUserFCMToken = async (token: string) => {
  const userId = getCurrentUserId();

  if (!userId) {
    return null;
  }

  try {
    await firestore().collection('users').doc(userId).update({
      FCMToken: token,
    });
  } catch (e: any) {
    console.log('firestore: error setting FCM token', e.message);
    throw e;
  }
};

export const getFavoriteMovies = async () => {
  try {
    const userProfile = await getUserProfile();
    return userProfile?.favoriteMovies ?? [];
  } catch (e: any) {
    console.log('firestore: error setting FCM token', e.message);
    throw e;
  }
};

export const addFavoriteMovie = async (
  movie: Pick<Movie, 'id' | 'title' | 'overview' | 'poster_path'>,
) => {
  const userId = getCurrentUserId();
  if (!userId) {
    throw new Error('User is not authenticated');
  }

  try {
    await firestore()
      .collection('users')
      .doc(userId)
      .set(
        {
          favoriteMovies: firestore.FieldValue.arrayUnion({
            id: movie?.id,
            title: movie?.title,
            overview: movie?.overview,
            poster_path: movie?.poster_path,
          }),
        },
        {merge: true},
      );

    console.log('Movie added to favorites');
  } catch (e) {
    console.error('Error adding favorite movie: ', e);
    throw e;
  }
};

export const removeFavoriteMovie = async (movieId: number) => {
  const userId = getCurrentUserId();
  if (!userId) {
    throw new Error('User is not authenticated');
  }

  try {
    const user = await getUserProfile();
    const favoriteMovies = user?.favoriteMovies || [];

    const updatedFavorites = favoriteMovies.filter(
      (movie: Movie) => movie.id !== movieId,
    );

    await firestore().collection('users').doc(userId).update({
      favoriteMovies: updatedFavorites,
    });

    console.log('Movie removed from favorites');
  } catch (e) {
    console.error('Error removing favorite movie: ', e);
    throw e;
  }
};

export const isFavoriteMovie = async (movieId: number) => {
  try {
    const user = await getUserProfile();

    const favoriteMovies = user?.favoriteMovies || [];
    return favoriteMovies.some((movie: Movie) => movie.id === movieId);
  } catch (error) {
    console.error('Error checking favorite movie:', error);
  }
};
