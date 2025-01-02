import {getImageUrl} from '@utils';
import {imagePlaceHolder} from '../../constants';
import {FC} from 'react';
import {View, Image, StyleSheet} from 'react-native';

interface MovieGridprops {
  movies: string[];
}
const MovieGrid: FC<MovieGridprops> = ({movies}) => (
  <View style={styles.gridView}>
    {movies.slice(0, 4).map((movie, index) => (
      <Image
        key={index}
        source={getImageUrl(movie) ?? imagePlaceHolder.MOVIE}
        style={styles.gridImage}
        resizeMode="cover"
      />
    ))}
  </View>
);

export default MovieGrid;

const styles = StyleSheet.create({
  gridView: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridImage: {
    width: '50%',
    height: '50%',
  },
});
