import FavoritesList from "@organisms/FavoritesList";
import firestore from "@react-native-firebase/firestore";
import auth from '@react-native-firebase/auth';
import { useEffect, useState } from "react";

function FavoritesScreen() {
  const [favoriteIds, setFavoriteIds] = useState([]);
  console.log('favorite ids: ',favoriteIds);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('users')
      .doc(auth().currentUser?.uid)
      .onSnapshot((documentSnapshot) => {
        const data = documentSnapshot.data();
        setFavoriteIds(data?.favoriteMovies || []);
      }, (error) => {
        console.error('Failed to retrieve movies', error);
      });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, []);

  return <FavoritesList movies={favoriteIds}/>;
}

export default FavoritesScreen;