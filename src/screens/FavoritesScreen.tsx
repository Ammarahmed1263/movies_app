import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';
import MoviesList from '@organisms/MoviesList';
import {View} from 'react-native';
import AppText from '@atoms/AppText';
import AppButton from '@atoms/AppButton';
import {HomeNavigationProp} from 'types/mainTabsTypes';
import {useNavigation} from '@react-navigation/native';
import {hs, vs, width} from '@styles/metrics';
import AppImage from '@atoms/AppImage';
import LottieView from 'lottie-react-native';
import FavoriteCard from '@molecules/FavoriteCard';
import { Movie } from 'types/movieTypes';

function FavoritesScreen() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const navigation = useNavigation<HomeNavigationProp>();
  console.log('favorite ids: ', favoriteMovies);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('users')
      .doc(auth().currentUser?.uid)
      .onSnapshot(
        documentSnapshot => {
          const data = documentSnapshot.data();
          setFavoriteMovies(data?.favoriteMovies.reverse() || []);
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
      data={favoriteMovies}
      renderItem={renderFavorite}
      contentContainerStyle={{flexGrow: 1, paddingBottom: vs(70)}}
      snapStyle={{bottom: vs(100)}}
      ListEmptyComponent={
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: hs(15),
          }}>
          {/* <LottieView
            source={require('../assets/lottie/no_wifi.json')}
            style={{width: '90%', aspectRatio: 1 / 1}}
            autoPlay
            loop
          /> */}
          <AppImage
            source={require('../assets/images/no-favorites.png')}
            style={{height: 250, aspectRatio: 1 / 1}}
          />
          <AppText variant='heading' style={{textAlign: 'center', marginBottom: vs(8)}}>
            No Favorites
          </AppText>
          <AppText variant='body' style={{textAlign: 'center', marginBottom: vs(8)}}>
            You can favorite a movie by clicking on the heart that shows up when
            you view movie details (top right).
          </AppText>
          <AppButton
            onPress={() => navigation.navigate('Search')}
            style={{height: 50, width: '70%'}}>
            Create Favorites
          </AppButton>
        </View>
      }
    />
  );
}

export default FavoritesScreen;
