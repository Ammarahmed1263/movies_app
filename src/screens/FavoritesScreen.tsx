import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';
import MoviesList from '@organisms/MoviesList';
import FavoriteCard from '@molecules/FavoriteCard';
import {Movie} from 'types/movieTypes';

function FavoritesScreen() {
  const [favorites, setFavorites] = useState([]);
  console.log('favorite ids: ', favorites);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('users')
      .doc(auth().currentUser?.uid)
      .onSnapshot(
        documentSnapshot => {
          const data = documentSnapshot.data();
          setFavorites(data?.favoriteMovies.reverse() || []);
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
      data={favorites}
      renderItem={renderFavorite}
    />
  );
}

export default FavoritesScreen;
