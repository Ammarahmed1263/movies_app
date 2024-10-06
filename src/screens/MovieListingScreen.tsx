import {FC, useEffect} from 'react';
import {ActivityIndicator, View} from 'react-native';
import AppText from '@atoms/AppText';
import {useTheme} from '@contexts/ThemeContext';
import MoviesList from '@organisms/MoviesList';
import {MovieListingScreenProps} from 'types/mainStackTypes';
import { useMoviesByCategory } from '@hooks/useMoviesByCategory';

const MovieListingScreen: FC<MovieListingScreenProps> = ({route}) => {
  const {category, time_window} = route.params;
  const {movies, handlePagination, loading} = useMoviesByCategory(category, time_window);
  const {colors} = useTheme();

  if (movies.length === 0) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <AppText variant="heading">loading...</AppText>
      </View>
    );
  }

  return (
    <MoviesList
      data={movies}
      onEndReached={handlePagination}
      keyExtractor={movie => movie.id.toString() + category}
      numColumns={2}
      columnWrapperStyle={{justifyContent: 'flex-start'}}
      ListFooterComponent={
        loading ? (
          <View style={{alignItems: 'center', paddingBottom: 10}}>
            <ActivityIndicator color={colors.secondary500} size="large" />
          </View>
        ) : null
      }
    />
  );
};

export default MovieListingScreen;
