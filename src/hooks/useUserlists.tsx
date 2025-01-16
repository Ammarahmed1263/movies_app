import {useEffect, useState} from 'react';
import {getUserLists} from '@services/userListsService';
import { UserListType } from 'types/userTypes';

const useUserLists = () => {
  const [lists, setLists] = useState<UserListType[]>([]);

  useEffect(() => {
    const unsubscribe = getUserLists(
      updatedLists => {
        setLists(updatedLists);
      },
    );

    return () => {
      unsubscribe();
    };
  }, []);
};

export default useUserLists;
