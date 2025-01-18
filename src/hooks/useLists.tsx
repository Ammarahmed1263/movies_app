import { getLists } from '@services/listsService';
import { useEffect, useState } from 'react';
import { ListType } from 'types/userTypes';

const useLists = () => {
  const [lists, setLists] = useState<ListType[]>([]);
  console.log(lists);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = getLists(
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

export default useLists;
