import AppButton from '@atoms/AppButton';
import AppImage from '@atoms/AppImage';
import AppLoading from '@atoms/AppLoading';
import AppText from '@atoms/AppText';
import {useTheme} from '@contexts/ThemeContext';
import useFavoriteMovies from '@hooks/useFavoriteMovies';
import MovieListItem from '@molecules/MovieListItem';
import MoviesList from '@organisms/MoviesList';
import {useNavigation} from '@react-navigation/native';
import {hs, ms, vs} from '@styles/metrics';
import {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const Ionicons = Icon as any;
import {HomeNavigationProp} from 'types/mainTabsTypes';
import {MovieSummary} from 'types/movieTypes';

function FavoritesScreen() {
  const {favorites, loading, removeMovieFromFavorite} = useFavoriteMovies();
  const navigation = useNavigation<HomeNavigationProp>();
  const {colors} = useTheme();
  const {t} = useTranslation();

  const handleDelete = useCallback(async (id: number) => {
    try {
      await removeMovieFromFavorite(id);
    } catch (error) {
      console.log('movie error occurred: ', error);
    }
  }, []);

  function renderFavorite({item}: {item: MovieSummary}) {
    return (
      <MovieListItem movie={item}>
        <AppButton
          customViewStyle={[
            styles.trash,
            {
              backgroundColor: colors.transparent,
            },
          ]}
          style={{marginStart: hs(5)}}
          onPress={() => handleDelete(item.id)}
          customView
          flat>
          <Ionicons name="trash-outline" size={25} color={colors.primary700} />
        </AppButton>
      </MovieListItem>
    );
  }

  if (loading) {
    return (
      <AppLoading
        size={ms(80)}
        speed={1.6}
        style={{marginBottom: vs(80)}}
        source={require('../assets/lottie/loading_fade.json')}
      />
    );
  }

  return (
    <MoviesList
      data={[...favorites].reverse() as MovieSummary[]}
      renderItem={renderFavorite}
      contentContainerStyle={styles.listContent}
      snapStyle={{bottom: vs(100)}}
      ListEmptyComponent={
        <View style={styles.noFavorite}>
          <AppImage
            source={require('../assets/images/no_favorites.png')}
            viewStyle={styles.image}
          />
          <AppText variant="heading" style={styles.text}>
            {t('no_favorites')}
          </AppText>
          <AppText
            variant="body"
            style={{textAlign: 'center', marginBottom: vs(8)}}>
            {t('favorite_action')}
          </AppText>
          <AppButton
            onPress={() => navigation.navigate('Search')}
            style={{width: '70%', marginTop: vs(10)}}>
            {t('create_favorite_list')}
          </AppButton>
        </View>
      }
    />
  );
}

export default FavoritesScreen;

const styles = StyleSheet.create({
  trash: {
    padding: hs(4),
    borderRadius: hs(8),
  },
  noFavorite: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: hs(15),
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: vs(70),
  },
  text: {
    textAlign: 'center',
    marginBottom: vs(8),
  },
  image: {
    flex: 0,
    height: hs(220),
    aspectRatio: 1 / 1,
  },
});
