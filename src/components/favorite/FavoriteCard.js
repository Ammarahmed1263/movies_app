import {Text, StyleSheet, View, Image, Pressable} from 'react-native';
import MovieButton from '../ui/MovieButton';
import GlobalStyles from '../../styles/GlobalStyles';
import ENDPOINT from '../../utils/Constants';
import Icon from 'react-native-vector-icons/Ionicons'

function FavoriteCard({movie}) {
  return (
    <MovieButton style={styles.container}>
      <Image
        source={{uri: ENDPOINT.image + movie.poster_path}}
        style={styles.image}
      />
      <View style={styles.description}>
        <View style={styles.headingContainer}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
            {movie.title}
          </Text>
          <Pressable style={{flex: 1}}>
            <Icon name='close-outline' size={30} color= {GlobalStyles.primary700} />
          </Pressable>
        </View>
        <Text numberOfLines={3} ellipsizeMode="tail" style={styles.overview}>
          {movie.overview}
        </Text>
      </View>
    </MovieButton>
  );
}

export default FavoriteCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 140,
    marginHorizontal: 20,
    marginBottom: 25,
  },
  image: {
    flex: 1.2,
    borderRadius: 8,
    resizeMode: 'cover'
  },
  description: {
    flex: 3,
    marginLeft: 20,
    marginVertical: 4,
    justifyContent: 'space-between',
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 7,
    fontSize: 22,
    fontFamily: GlobalStyles.fontBold,
    color: GlobalStyles.secondary500,
  },
  rating: {
    fontSize: 16,
    color: GlobalStyles.paleWhite,
    fontFamily: GlobalStyles.fontLight
  },
  overview: {
    fontFamily: GlobalStyles.fontLight,
    fontSize: 16,
    color: GlobalStyles.paleWhite,
    marginBottom: 8,
  },
});
