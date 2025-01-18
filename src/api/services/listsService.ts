import firestore from '@react-native-firebase/firestore';
import {ListType} from 'types/userTypes';
import {getCurrentUserId, getUserProfile} from './userService';

const getLists = (callback: (lists: ListType[]) => void) => {
  const userId = getCurrentUserId();

  const unsubscribe = firestore()
    .collection('users')
    .doc(userId)
    .onSnapshot(snapshot => {
      const lists = snapshot.data()?.lists || [];
      callback(lists);
    });

  return unsubscribe;
};

const addList = async (list: ListType) => {
  const userId = getCurrentUserId();
  if (!userId) {
    throw new Error('User is not authenticated');
  }
  console.log('inside service list is: ', list)
  try {
    await firestore()
      .collection('users')
      .doc(userId)
      .set(
        {
          lists: firestore.FieldValue.arrayUnion(list),
        },
        {merge: true},
      );

    console.log('user list created');
  } catch (e) {
    console.error('Error creating list: ', e);
    throw e;
  }
};

const removeList = async (listId: string) => {
  const userId = getCurrentUserId();
  if (!userId) {
    throw new Error('User is not authenticated');
  }

  try {
    const user = await getUserProfile();
    const lists = user?.lists || [];

    const updatedLists = lists.filter(
      (list: ListType) => list.id !== listId,
    );

    await firestore().collection('users').doc(userId).update({
      lists: updatedLists,
    });

    console.log('user list removed');
  } catch (e) {
    console.error('Error adding favorite movie: ', e);
    throw e;
  }
};

export {getLists, addList, removeList};
