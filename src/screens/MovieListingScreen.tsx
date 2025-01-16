import AppLoading from '@atoms/AppLoading';
import AppText from '@atoms/AppText';
import { useMoviesByCategory } from '@hooks/useMoviesByCategory';
import MoviesList from '@organisms/MoviesList';
import { hs, vs } from '@styles/metrics';
import { FC } from 'react';
import { View } from 'react-native';
import { MovieListingScreenProps } from 'types/mainStackTypes';

const MovieListingScreen: FC<MovieListingScreenProps> = ({route}) => {
  const {category, time_window} = route.params;
  const {movies, page, total_pages, handlePagination} = useMoviesByCategory(category, time_window);

  if (movies.length === 0) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <AppText variant="heading">Ooops...No items found</AppText>
      </View>
    );
  }

  return (
    <MoviesList
      data={movies}
      onEndReached={handlePagination}
      keyExtractor={movie => movie.id.toString() + category}
      numColumns={2}
      columnWrapperStyle={{justifyContent: 'flex-start', gap: hs(12), marginVertical: vs(10)}}
      contentContainerStyle={{flexGrow: 1, marginHorizontal: hs(10)}}
      ListFooterComponent={
        page < total_pages && movies.length !== 0 ? (
          <View style={{alignItems: 'center', paddingBottom: vs(20)}}>
            <AppLoading
              size={35}
              speed={2.5}
              source={require('../assets/lottie/loading_fade.json')}
            />
          </View>
        ) : null
      }
    />
  );
};

export default MovieListingScreen;
