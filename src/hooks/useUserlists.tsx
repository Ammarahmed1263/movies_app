import {useEffect, useState} from 'react';
import {getUserLists} from '@services/userListsService';
import { UserListType } from 'types/userTypes';

const useUserLists = () => {
  const [lists, setLists] = useState<UserListType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = getUserLists(
      updatedLists => {
        console.log('current user lists:', updatedLists);
        setLists([{id: 'add', title: 'Create a new list', movies: []}, ...updatedLists]);
      },
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return { lists }
};

export default useUserLists;
