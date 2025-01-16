import firestore from '@react-native-firebase/firestore';
import {UserListType} from 'types/userTypes';
import {getCurrentUserId, getUserProfile} from './userService';

const getUserLists = (callback: (lists: UserListType[]) => void) => {
  const userId = getCurrentUserId();

  const unsubscribe = firestore()
    .collection('users')
    .doc(userId)
    .onSnapshot(snapshot => {
      const lists = snapshot.data()?.userLists || [];
      callback(lists);
    });

  return unsubscribe;
};

const addUserList = async (list: UserListType) => {
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
          userLists: firestore.FieldValue.arrayUnion({
            id: list?.id,
            title: list?.title,
            poster_path: list?.poster_path,
          }),
        },
        {merge: true},
      );

    console.log('user list created');
  } catch (e) {
    console.error('Error adding favorite movie: ', e);
    throw e;
  }
};

const removeUserList = async (listId: string) => {
  const userId = getCurrentUserId();
  if (!userId) {
    throw new Error('User is not authenticated');
  }

  try {
    const user = await getUserProfile();
    const userLists = user?.userLists || [];

    const updatedUserLists = userLists.filter(
      (list: UserListType) => list.id !== listId,
    );

    await firestore().collection('users').doc(userId).update({
      userLists: updatedUserLists,
    });

    console.log('user list removed');
  } catch (e) {
    console.error('Error adding favorite movie: ', e);
    throw e;
  }
};

export {getUserLists, addUserList, removeUserList};
