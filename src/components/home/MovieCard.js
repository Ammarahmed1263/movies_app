import {StyleSheet, Text, Image} from 'react-native';
import GlobalStyles from '../../styles/GlobalStyles';
import ENDPOINT from '../../utils/Constants';
import MovieButton from '../ui/MovieButton';
import { useNavigation } from '@react-navigation/native';

function MovieCard({movie}) {
  const navigation = useNavigation();

  return (
    <MovieButton style={styles.container} onPress={() => navigation.navigate('MovieDetails', {id: movie.id})}>
      <Text style={styles.rating}>
        {movie.vote_average > 0 ? Math.ceil(movie.vote_average * 10) / 10 : 'NR'}
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
  container: {
    marginHorizontal: 10,
    width: 150,
    height: 225,
    borderWidth: 1.7,
    borderRadius: 14,
  },
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
