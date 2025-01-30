import {getLists} from '@services/listsService';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ListType} from 'types/userTypes';

const useLists = () => {
  const [lists, setLists] = useState<ListType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {t} = useTranslation();

  useEffect(() => {
    const unsubscribe = getLists(updatedLists => {
      console.log('current user lists:', updatedLists);
      setLists([
        {id: 'add', title: t('create_new_list'), movies: []},
        ...updatedLists,
      ]);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return {lists};
};

export default useLists;
