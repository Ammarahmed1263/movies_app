import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import MovieCardButton from '@atoms/MovieCardButton';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '@contexts/ThemeContext';
import {
  convertToArabicNumerals,
  formatVoteCount,
  getImageUrl,
  getDeviceLanguage,
} from '@utils';
import Image from '@atoms/AppImage';
import {FC} from 'react';
import {Movie} from 'types/movieTypes';
import {MovieDetailsNavigationProp} from 'types/mainStackTypes';
import AppText from '@atoms/AppText';
import {hs, ms} from '@styles/metrics';
import {FontVariants} from 'types/themeTypes';

interface MovieCardProps {
  movie: Movie;
  titleVariant?: FontVariants;
  hideVote?: boolean;
  style?: ViewStyle;
  ImageViewStyle?: ViewStyle;
}

const MovieCard: FC<MovieCardProps> = ({
  movie,
  titleVariant = 'body',
  hideVote = false,
  style,
  ImageViewStyle,
}) => {
  const navigation = useNavigation<MovieDetailsNavigationProp>();
  const {colors} = useTheme();

  return (
    <MovieCardButton
      style={[styles.cardContainer, style ?? {}]}
      onPress={() => navigation.push('MovieDetails', {id: movie.id})}>
      <View
        style={[
          styles.imageContainer,
          {borderColor: colors.secondary500},
          ImageViewStyle,
        ]}>
        {!hideVote && (
          <View style={styles.rating}>
            <AppText
              variant="regular"
              style={{
                ...styles.ratingText,
                color: colors.primary500,
                backgroundColor: colors.secondary500,
              }}>
              {getDeviceLanguage() === 'ar'
                ? convertToArabicNumerals(formatVoteCount(movie.vote_average))
                : formatVoteCount(movie.vote_average)}
            </AppText>
          </View>
        )}
        <Image
          source={getImageUrl(movie.poster_path)}
          viewStyle={{overflow: 'hidden', borderRadius: ms(18)}}
        />
      </View>
      <AppText
        variant={titleVariant}
        style={{
          ...styles.title,
          color: colors.paleShade,
        }}
        ellipsizeMode="tail"
        numberOfLines={1}>
        {movie.title}
      </AppText>
    </MovieCardButton>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: hs(150),
  },
  imageContainer: {
    width: '100%',
    height: hs(150) * (3 / 2),
    borderTopWidth: 2.6,
    borderBottomWidth: 2.6,
    borderWidth: 1.2,
    borderRadius: ms(20),
    overflow: 'hidden',
  },
  rating: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    borderBottomStartRadius: hs(7),
    borderTopEndRadius: hs(18),
    overflow: 'hidden',
  },
  ratingText: {
    fontSize: 12,
    paddingHorizontal: 10,
  },
  title: {
    textAlign: 'center',
    marginTop: 15,
    alignSelf: 'center',
    width: '70%',
  },
});
