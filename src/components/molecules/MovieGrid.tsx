import AppImage from '@atoms/AppImage';
import {getImageUrl} from '@utils';
import {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {Movie} from 'types/movieTypes';

interface MovieGridprops {
  movies: Pick<Movie, 'id' | 'title' | 'overview' | 'poster_path'>[];
}
const MovieGrid: FC<MovieGridprops> = ({movies}) => (
  <View style={styles(movies.length).gridView}>
    {movies.slice(0, 4).map((movie, index) => (
      <AppImage
        key={index}
        viewStyle={styles(movies.length).gridImage}
        source={getImageUrl(movie.poster_path)}
        placeholder="movie"
        resizeMode="stretch"
      />
    ))}
  </View>
);

export default MovieGrid;

const styles = (movies: number) =>
  StyleSheet.create({
    gridView: {
      width: '100%',
      height: '104%',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    gridImage: {
      flex: 0,
      width: movies < 4 ? '100%' : `${100 / 2}%`,
      height: movies < 4 ? '100%' : `${100 / 2}%`,
      marginVertical: -1,
    },
  });
