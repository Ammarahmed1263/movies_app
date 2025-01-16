import {getImageUrl} from '@utils';
import {imagePlaceHolder} from '../../constants';
import {FC} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import { Movie } from 'types/movieTypes';

interface MovieGridprops {
  movies: Pick<Movie, 'id' | 'title' | 'overview' | 'poster_path'>[];
}
const MovieGrid: FC<MovieGridprops> = ({movies}) => (
  <View style={styles(movies.length).gridView}>
    {movies.slice(0,4).map((movie, index) => (
      <Image
        key={index}
        source={getImageUrl(movie.poster_path) ?? imagePlaceHolder.MOVIE}
        style={styles(movies.length).gridImage}
        // resizeMode="center"
      />
    ))}
  </View>
);

export default MovieGrid;

const styles = (movies: number) => StyleSheet.create({
  gridView: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridImage: {
    width: movies < 4 ? '100%' : `${100 / 2}%`,
    height: movies < 4 ? '100%' : `${100 / 2}%`,
    marginVertical: -1
  },
});
