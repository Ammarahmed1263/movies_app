import {StyleSheet, Text, ViewStyle} from 'react-native';
import MovieButton from '@atoms/MovieCardButton';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '@contexts/ThemeContext';
import {convertToArabicNumerals, formatVoteCount, getImageUrl} from '@utils/index';
import Image from '@atoms/AppImage';
import {useTranslation} from 'react-i18next';
import {FC} from 'react';
import {Movie} from 'types/movieTypes';
import { MovieDetailsNavigationProp } from 'types/mainStackTypes';

interface MovieCardProps {
  movie: Movie;
  style?: ViewStyle;
}

const MovieCard: FC<MovieCardProps> = ({movie, style}) => {
  const navigation = useNavigation<MovieDetailsNavigationProp>();
  const {colors, fonts} = useTheme();
  const {i18n} = useTranslation();

  return (
    <MovieButton
      style={{
        ...styles.container,
        ...style,
      }}
      onPress={() => navigation.push('MovieDetails', {id: movie.id})}>
      <Text
        style={{
          ...styles.rating,
          color: colors.primary500,
          fontFamily: fonts.bold,
          backgroundColor: colors.secondary500,
        }}>
        {i18n.language == 'ar'
          ? convertToArabicNumerals(formatVoteCount(movie.vote_average))
          : formatVoteCount(movie.vote_average)}
      </Text>
      <Image uri={getImageUrl(movie.poster_path)} />
    </MovieButton>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  container: {
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
    top: 0,
    right: 0,
    fontSize: 12,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 7,
    alignSelf: 'center',
  },
});
