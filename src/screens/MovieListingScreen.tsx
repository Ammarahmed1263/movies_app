import AppLoading from '@atoms/AppLoading';
import AppText from '@atoms/AppText';
import {useMoviesList} from '@hooks/useMoviesList';
import MoviesList from '@organisms/MoviesList';
import {hs, vs} from '@styles/metrics';
import {FC, useLayoutEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {MovieListingScreenProps} from 'types/mainStackTypes';
import {MovieSummary} from 'types/movieTypes';

const MovieListingScreen: FC<MovieListingScreenProps> = ({
  route,
  navigation,
}) => {
  const {type, value, title, time_window} = route.params;
  const {movies, loading, page, total_pages, handlePagination} = useMoviesList(
    type,
    value,
    time_window,
  );
  const {t} = useTranslation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: type === 'genre' ? title : t(value),
    });
  });

  if (loading && total_pages === 0) {
    return (
      <AppLoading
        size={80}
        source={require('../assets/lottie/loading_fade.json')}
      />
    );
  }

  return (
    <MoviesList
      data={movies as MovieSummary[]}
      onEndReached={handlePagination}
      keyExtractor={movie => movie.id.toString() + value}
      numColumns={2}
      columnWrapperStyle={{
        width: '100%',
        justifyContent: 'space-between',
        gap: hs(15),
        marginVertical: vs(10),
      }}
      contentContainerStyle={{flexGrow: 1}}
      ListEmptyComponent={
        movies.length === 0 ? (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <AppText variant="heading">Ooops...No Movies found</AppText>
          </View>
        ) : null
      }
      ListFooterComponent={
        page < total_pages && movies.length !== 0 ? (
          <AppLoading
            size={35}
            speed={2.5}
            source={require('../assets/lottie/loading_fade.json')}
          />
        ) : null
      }
    />
  );
};

export default MovieListingScreen;
