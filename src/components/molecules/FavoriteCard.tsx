import {Text, StyleSheet, View, Pressable} from 'react-native';
import Image from '@atoms/AppImage';

import {useTheme} from '@contexts/ThemeContext';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import MovieButton from '@atoms/MovieCardButton';
import { getImageUrl } from '@utils/index';
import { Movie } from 'types/movieTypes';
import { FC } from 'react';
import { MovieDetailsNavigationProp } from 'types/mainStackTypes';
import AppText from '@atoms/AppText';

interface FavoriteCardProps {
  movie: Movie
}

const FavoriteCard: FC<FavoriteCardProps> = ({movie}) => {
  const {colors} = useTheme();
  const navigation = useNavigation<MovieDetailsNavigationProp>();

  return (
    <MovieButton
      style={styles.container}
      onPress={() => navigation.navigate('MovieDetails', {id: movie.id})}>
      <Image
        uri={getImageUrl(movie.poster_path)}
        style={styles.image}
      />
      <View style={styles.description}>
        <View style={styles.headingContainer}>
          <AppText
            variant='heading'
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              ...styles.title,
              color: colors.secondary500,
            }}>
            {movie.title}
          </AppText>
          <Pressable
            style={styles.trash}>
            <Icon name="trash-outline" size={26} color={colors.primary700} />
          </Pressable>
        </View>
        <AppText
          variant='body'
          numberOfLines={3}
          ellipsizeMode="tail"
          style={{
            ...styles.overview,
            color: colors.paleShade,
          }}>
          {movie.overview}
        </AppText>
      </View>
    </MovieButton>
  );
}

export default FavoriteCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    minHeight: 140,
    marginHorizontal: 20,
    marginBottom: 25,
  },
  image: {
    flex: 1.2,
    borderRadius: 8,
    resizeMode: 'cover',
    overflow: 'hidden'
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
    width: '80%'
  },
  trash: {
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
    width: '20%'
  },
  overview: {
    marginBottom: 8,
  },
});
