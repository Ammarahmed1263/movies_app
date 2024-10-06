import {FC, useEffect} from 'react';
import {ActivityIndicator, View} from 'react-native';
import AppText from '@atoms/AppText';
import {useTheme} from '@contexts/ThemeContext';
import MoviesList from '@organisms/MoviesList';
import {MovieListingScreenProps} from 'types/mainStackTypes';
import { useMoviesByCategory } from '@hooks/useMoviesByCategory';

const MovieListingScreen: FC<MovieListingScreenProps> = ({route}) => {
  const {category, time_window} = route.params;
  const {movies, page, total_pages, handlePagination, loading} = useMoviesByCategory(category, time_window);
  const {colors} = useTheme();

  if (movies.length === 0) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <AppText variant="heading">loading...</AppText>
      </View>
    );
  }

  // useEffect(() => {
  //   console.log('component rendered with data: ', page, total_pages);
  // }, [page]);

  return (
    <MoviesList
      data={movies}
      onEndReached={handlePagination}
      keyExtractor={movie => movie.id.toString() + category}
      numColumns={2}
      columnWrapperStyle={{justifyContent: 'flex-start'}}
      ListFooterComponent={
        page < total_pages && movies.length !== 0 ? (
          <View style={{alignItems: 'center', paddingBottom: 10}}>
            <ActivityIndicator color={colors.secondary500} size="large" />
          </View>
        ) : null
      }
    />
  );
};

export default MovieListingScreen;
