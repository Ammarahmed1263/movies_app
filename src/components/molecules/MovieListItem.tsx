import Image from '@atoms/AppImage';
import AppText from '@atoms/AppText';
import MovieButton from '@atoms/MovieCardButton';
import { useTheme } from '@contexts/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { getImageUrl } from '@utils';
import { FC, ReactNode } from 'react';
import { PressableProps, StyleSheet, View } from 'react-native';
import { MovieDetailsNavigationProp } from 'types/mainStackTypes';
import { Movie } from 'types/movieTypes';

interface FavoriteCardProps extends PressableProps{
  movie: Movie;
  children: ReactNode
}

const FavoriteCard: FC<FavoriteCardProps> = ({movie, children, ...props}) => {
  const {colors} = useTheme();
  const navigation = useNavigation<MovieDetailsNavigationProp>();

  return (
    <MovieButton
      style={styles.container}
      onPress={() => navigation.navigate('MovieDetails', {id: movie.id})}
      {...props}
      >
      <Image
        source={getImageUrl(movie.poster_path)}
        viewStyle={styles.image}
        loadingSize='small'
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
          {children}
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
    marginHorizontal: 10,
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
  overview: {
    marginBottom: 8,
  },
});
