import Image from '@atoms/AppImage';
import AppText from '@atoms/AppText';
import MovieCardButton from '@atoms/MovieCardButton';
import {useTheme} from '@contexts/ThemeContext';
import {useNavigation} from '@react-navigation/native';
import {hs, ms, vs} from '@styles/metrics';
import {convertToArabicNumerals, formatVoteCount, getImageUrl} from '@utils';
import {FC} from 'react';
import {I18nManager, StyleSheet, View, ViewStyle} from 'react-native';
import {MovieDetailsNavigationProp} from 'types/mainStackTypes';
import {Movie} from 'types/movieTypes';
import {FontVariants} from 'types/themeTypes';
import Icon from 'react-native-vector-icons/AntDesign';

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
          <View style={[styles.rating, {backgroundColor: colors.secondary500}]}>
            <AppText
              variant="regular"
              style={{
                ...styles.ratingText,
                color: colors.primary500,
              }}>
              {I18nManager.isRTL
                ? convertToArabicNumerals(formatVoteCount(movie.vote_average))
                : formatVoteCount(movie.vote_average)}
            </AppText>
            <Icon
              name="star"
              size={12}
              color={colors.primary500}
              // style={{paddingBottom: vs(2)}}
            />
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
    flexDirection: 'row',
    alignItems: 'baseline',
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    paddingHorizontal: hs(10),
    paddingVertical: hs(2),
    borderBottomStartRadius: hs(7),
    borderTopEndRadius: hs(18),
    overflow: 'hidden',
  },
  ratingText: {
    fontSize: 12,
    paddingHorizontal: hs(2),
  },
  title: {
    textAlign: 'center',
    marginTop: 15,
    alignSelf: 'center',
    width: '70%',
  },
});
