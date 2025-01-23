import AppButton from '@atoms/AppButton';
import AppImage from '@atoms/AppImage';
import AppText from '@atoms/AppText';
import { useTheme } from '@contexts/ThemeContext';
import FavoriteCard from '@molecules/MovieListItem';
import MoviesList from '@organisms/MoviesList';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { removeFavoriteMovie } from '@services/userService';
import { hs, vs } from '@styles/metrics';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { HomeNavigationProp } from 'types/mainTabsTypes';
import { Movie } from 'types/movieTypes';


function FavoritesScreen() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const navigation = useNavigation<HomeNavigationProp>();
  const { colors } = useTheme();

  const handleDelete = useCallback(async (id: number) => {
    try {
        await removeFavoriteMovie(id);
    } catch (error) {
      console.log('movie error occurred: ', error);
    }
  }, []);
  
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
    return (
      <FavoriteCard movie={item}>
        <TouchableOpacity style={styles.trash} onPress={() => handleDelete(item.id)}>
          <Icon name="trash-outline" size={26} color={colors.primary700} />
        </TouchableOpacity>
      </FavoriteCard>
    );
  }

  return (
    <MoviesList
      data={favoriteMovies}
      renderItem={renderFavorite}
      contentContainerStyle={styles.listContent}
      snapStyle={{bottom: vs(100)}}
      ListEmptyComponent={
        <View
          style={styles.noFavorite}>
          <AppImage
            source={require('../assets/images/no-favorites.png')}
            style={{height: 250, aspectRatio: 1 / 1}}
          />
          <AppText
            variant="heading"
            style={styles.text}>
            No Favorites
          </AppText>
          <AppText
            variant="body"
            style={{textAlign: 'center', marginBottom: vs(8)}}>
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

const styles = StyleSheet.create({
  trash: {
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
    width: '20%'
  },
  noFavorite: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: hs(15),
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: vs(70)
  },
  text:{
    textAlign: 'center',
    marginBottom: vs(8)
  }
})
