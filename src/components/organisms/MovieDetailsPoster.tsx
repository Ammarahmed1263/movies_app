import {durationToString, formatVoteCount, getImageUrl} from '@utils';
import {FC} from 'react';
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import NavigationHeader from './NavigationHeader';
import AppText from '@atoms/AppText';
import {hs, ms, vs} from '@styles/metrics';
import {useTheme} from '@contexts/ThemeContext';
import {MovieDetails} from 'types/movieTypes';
import {imagePlaceHolder} from '../../constants';

interface MovieDetailsPosterProps {
  movieDetails: MovieDetails | undefined;
  isFavorite: boolean;
  onGoBack: () => void;
  onToggleFavorite: () => void;
  headerStyle?: ViewStyle;
  style?: ViewStyle;
}

const MovieDetailsPoster: FC<MovieDetailsPosterProps> = ({
  movieDetails,
  isFavorite,
  onGoBack,
  onToggleFavorite,
  style,
  headerStyle,
}) => {
  const {colors} = useTheme();
  const {width, height} = useWindowDimensions();
  const isLandscape = width > height;

  return (
    <ImageBackground
      source={getImageUrl(movieDetails?.poster_path) ?? imagePlaceHolder.MOVIE}
      style={[
        styles.poster,
        {width: width, aspectRatio: isLandscape ? 4 / 3 : 3 / 4},
        style,
      ]}
      resizeMode="stretch">
      <LinearGradient
        colors={['transparent', colors.primary500]}
        locations={[0.3, 0.9]}
        style={{flex: 1}}>
        <NavigationHeader
          onGoBack={onGoBack}
          isFavorite={isFavorite}
          onToggleFavorite={onToggleFavorite}
          style={headerStyle}
        />
        <View style={styles.quickpeak}>
          <AppText
            variant="heading"
            style={{
              ...styles.movieTitle,
              color: colors.paleShade,
            }}>
            {movieDetails?.title}
          </AppText>
          <AppText
            variant="regular"
            style={{
              color: colors.paleShade,
              alignSelf: 'flex-start',
            }}>
            {`${formatVoteCount(
              movieDetails?.vote_average ?? 0,
            )} · ${durationToString(movieDetails?.runtime ?? 0)} · ${
              movieDetails?.release_date.split('-')[0]
            }`}
          </AppText>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default MovieDetailsPoster;

const styles = StyleSheet.create({
  poster: {
    paddingTop: StatusBar.currentHeight ?? vs(50) + vs(10),
  },
  quickpeak: {
    position: 'absolute',
    bottom: vs(10),
    marginLeft: hs(15),
  },
  movieTitle: {
    fontSize: ms(37),
    lineHeight: vs(45),
    maxWidth: hs(300),
  },
  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(22, 21, 21, 0.8)',
  },
});
