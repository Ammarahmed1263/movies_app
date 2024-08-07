import {StyleSheet, Text, Image} from 'react-native';
import ENDPOINT from '../../utils/Constants';
import MovieButton from '../ui/MovieButton';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../store/context/ThemeContext';
import { toVote } from '../../utils/utils';

function MovieCard({movie}) {
  const navigation = useNavigation();
  const {colors, fonts} = useTheme();

  return (
    <MovieButton
      style={{...styles.container, backgroundColor: colors.secondary500}}
      onPress={() => navigation.push('MovieStack', {screen: 'MovieDetails', params: {id: movie.id}})}>
      <Text
        style={{
          ...styles.rating,
          color: colors.primary500,
          fontFamily: fonts.bold,
          backgroundColor: colors.secondary500,
        }}>
        {toVote(movie.vote_average)}
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
    borderTopWidth: 2.4,
    borderBottomWidth: 2.4,
    borderWidth: 1.2,
    borderRadius: 14,
  },
  rating: {
    position: 'absolute',
    zIndex: 1,
    top: 10,
    right: 11,
    fontSize: 15,
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
