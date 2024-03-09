import {StyleSheet, Text, Image} from 'react-native';
import GlobalStyles from '../../utils/GlobalStyles';
import ENDPOINT from '../../utils/Constants';
import MovieButton from '../ui/MovieButton';

function MovieCard({movie}) {
  return (
    <MovieButton>
      <Text style={styles.rating}>
        {Math.ceil(movie.vote_average * 10) / 10}
      </Text>
      <Image
        source={{
          uri: ENDPOINT.image + movie.poster_path,
        }}
        style={styles.image}
      />
    </MovieButton>
  );
}

export default MovieCard;

const styles = StyleSheet.create({
  rating: {
    position: 'absolute',
    zIndex: 1,
    top: 10,
    right: 11,
    fontSize: 15,
    color: GlobalStyles.primary500,
    fontFamily: GlobalStyles.fontBold,
    backgroundColor: GlobalStyles.secondary500,
    paddingHorizontal: 10,
    borderRadius: 7,
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
