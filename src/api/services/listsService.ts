import firestore from '@react-native-firebase/firestore';
import {UserListType} from 'types/userTypes';
import {getCurrentUserId, getUserProfile} from './userService';

const getLists = (callback: (lists: UserListType[]) => void) => {
  const userId = getCurrentUserId();

  const unsubscribe = firestore()
    .collection('users')
    .doc(userId)
    .onSnapshot(snapshot => {
      const lists = snapshot.data()?.Lists || [];
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
          Lists: firestore.FieldValue.arrayUnion({
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
    const Lists = user?.Lists || [];

    const updatedLists = Lists.filter(
      (list: UserListType) => list.id !== listId,
    );

    await firestore().collection('users').doc(userId).update({
      Lists: updatedLists,
    });

    console.log('user list removed');
  } catch (e) {
    console.error('Error adding favorite movie: ', e);
    throw e;
  }
};

export {getLists, addUserList, removeUserList};
