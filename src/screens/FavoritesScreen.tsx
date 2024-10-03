import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';
import MoviesList from '@organisms/MoviesList';
import FavoriteCard from '@molecules/FavoriteCard';
import {Movie} from 'types/movieTypes';

function FavoritesScreen() {
  const [favoriteIds, setFavoriteIds] = useState([]);
  console.log('favorite ids: ', favoriteIds);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('users')
      .doc(auth().currentUser?.uid)
      .onSnapshot(
        documentSnapshot => {
          const data = documentSnapshot.data();
          setFavoriteIds(data?.favoriteMovies || []);
        },
        error => {
          console.error('Failed to retrieve movies', error);
        },
      );

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, []);

  function renderFavorite({item}: {item: Movie}) {
    return <FavoriteCard movie={item} />;
  }

  return (
    <MoviesList
      data={favoriteIds}
      renderItem={renderFavorite}
    />
  );
}

export default FavoritesScreen;
