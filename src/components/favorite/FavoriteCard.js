import {Text, StyleSheet, View, Image, Pressable} from 'react-native';
import {useTheme} from '../../store/context/ThemeContext';
import {useNavigation} from '@react-navigation/native';
import MovieButton from '../ui/MovieButton';
import ENDPOINT from '../../utils/Constants';
import Icon from 'react-native-vector-icons/Ionicons';

function FavoriteCard({movie}) {
  const {colors, fonts} = useTheme();
  const navigation = useNavigation();

  return (
    <MovieButton
      style={styles.container}
      onPress={() => navigation.navigate('MovieStack', {screen: 'MovieDetails', params: {id: movie.id}})}>
      <Image
        source={{uri: ENDPOINT.image + movie.poster_path}}
        style={styles.image}
      />
      <View style={styles.description}>
        <View style={styles.headingContainer}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              ...styles.title,
              fontFamily: fonts.bold,
              color: colors.secondary500,
            }}>
            {movie.title}
          </Text>
          <Pressable style={{flex: 1}}>
            <Icon name="close-outline" size={30} color={colors.primary700} />
          </Pressable>
        </View>
        <Text
          numberOfLines={3}
          ellipsizeMode="tail"
          style={{
            ...styles.overview,
            fontFamily: fonts.light,
            color: colors.paleShade,
          }}>
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
    resizeMode: 'cover',
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
  },
  overview: {
    fontSize: 16,
    marginBottom: 8,
  },
});
