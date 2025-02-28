import firestore from '@react-native-firebase/firestore';
import {ListType} from 'types/userTypes';
import {getCurrentUserId, getUserProfile} from './userService';
import {Movie} from 'types/movieTypes';

const getLists = (callback: (lists: ListType[]) => void) => {
  const userId = getCurrentUserId();

  const unsubscribe = firestore()
    .collection('users')
    .doc(userId)
    .collection('lists')
    .onSnapshot(
      snapshot => {
        const lists = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as ListType[];

        callback(lists);
      },
      error => {
        console.error('Error in Firestore snapshot listener:', error);
      },
    );

  return unsubscribe;
};

const getListById = (listId: number, callback: (list: ListType) => void) => {
  const userId = getCurrentUserId();

  const unsubscribe = firestore()
    .collection('users')
    .doc(userId)
    .collection('lists')
    .doc(listId.toString())
    .onSnapshot(
      snapshot => {
        const lists = snapshot.data() as ListType;

        callback(lists);
        console.log('current list:', listId, lists);
      },
      error => {
        console.error('Error in Firestore snapshot listener:', error);
      },
    );

  return unsubscribe;
};

const addList = async (list: ListType) => {
  const userId = getCurrentUserId();
  if (!userId) {
    throw new Error('User is not authenticated');
  }
  try {
    await firestore()
      .collection('users')
      .doc(userId)
      .collection('lists')
      .doc(list.id.toString())
      .set(list);
  } catch (e) {
    console.error('Error creating list: ', e);
    throw e;
  }
};

const removeList = async (listId: number) => {
  const userId = getCurrentUserId();
  if (!userId) {
    throw new Error('User is not authenticated');
  }

  try {
    await firestore()
      .collection('users')
      .doc(userId)
      .collection('lists')
      .doc(listId.toString())
      .delete();

    console.log('user list removed');
  } catch (e) {
    console.error('Error adding favorite movie: ', e);
    throw e;
  }
};

const addMovieToList = async (
  movie: Pick<Movie, 'id' | 'title' | 'overview' | 'poster_path'>,
  listId: number,
) => {
  const userId = getCurrentUserId();
  if (!userId) {
    throw new Error('User is not authenticated');
  }

  try {
    await firestore()
      .collection('users')
      .doc(userId)
      .collection('lists')
      .doc(listId.toString())
      .update({
        movies: firestore.FieldValue.arrayUnion({
          ...movie,
        }),
      });
  } catch (e) {
    console.error('Error adding movie to list: ', e);
    throw e;
  }
};

const removeMovieFromlist = async (movieId: number, listId: number) => {
  const userId = getCurrentUserId();
  if (!userId) {
    throw new Error('User is not authenticated');
  }

  try {
    const docRef = firestore()
      .collection('users')
      .doc(userId)
      .collection('lists')
      .doc(listId.toString());

    const docSnapshot = await docRef.get();
    const data = docSnapshot.data();

    const updatedMovies = data?.movies.filter(
      (movie: Pick<Movie, 'id' | 'title' | 'overview' | 'poster_path'>) =>
        movie.id !== movieId,
    );

    await docRef.update({movies: updatedMovies});
  } catch (e) {
    console.error('Error removing movie from list: ', e);
    throw e;
  }
};

export {
  getLists,
  getListById,
  addList,
  removeList,
  addMovieToList,
  removeMovieFromlist,
};
