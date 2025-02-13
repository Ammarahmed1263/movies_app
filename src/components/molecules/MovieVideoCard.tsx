import {StyleSheet, Text, View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import MovieCardButton from '@atoms/MovieCardButton';
import AppImage from '@atoms/AppImage';
import {getImageUrl} from '@utils';
import {useTheme} from '@contexts/ThemeContext';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/Ionicons';
import {Movie, MovieArray, Trailer} from 'types/movieTypes';
import AppText from '@atoms/AppText';
import {hs, ms, vs, width} from '@styles/metrics';
import {MovieDetailsNavigationProp} from 'types/mainStackTypes';
import {useNavigation} from '@react-navigation/native';
import {getMovieVideos} from '@services/movieService';

type MovieVideoCardProps = {
  movie: Movie;
  onPress: (trailers: Trailer[]) => void;
};

const MovieVideoCard: FC<MovieVideoCardProps> = ({movie, onPress}) => {
  const {colors} = useTheme();
  const [trailer, setTrailer] = useState<Trailer[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getMovieVideos(movie.id);
      setTrailer(data.results);
    })();
  }, []);

  return (
    <MovieCardButton onPress={() => onPress(trailer)}>
      <View style={[styles.video, {borderColor: colors.secondary500}]}>
        <AppImage
          source={getImageUrl(movie.backdrop_path)}
          style={{borderRadius: ms(9)}}
          resizeMode="cover"
        />
        <View
          style={[
            styles.play,
            {
              backgroundColor: colors.transparent,
            },
          ]}>
          <Icon name="play" size={ms(50)} color={colors.paleShade} />
        </View>
      </View>

      <View style={styles.textContainer}>
        <AppText variant="subheading" style={styles.text} numberOfLines={1}>
          {movie.title}
        </AppText>
        <AppText variant="light" style={styles.text} numberOfLines={1}>
          {trailer[0]?.name}
        </AppText>
      </View>
    </MovieCardButton>
  );
};

export default MovieVideoCard;

const styles = StyleSheet.create({
  video: {
    width: width / 1.15,
    height: (width / 1.15) * (9 / 16),
    borderRadius: ms(12),
    borderTopWidth: vs(3),
    borderBottomWidth: vs(3),
    borderWidth: hs(1),
    overflow: 'hidden',
  },
  play: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -ms(32)}, {translateY: -ms(32)}],
    padding: hs(10),
    borderRadius: hs(35),
  },
  textContainer: {
    paddingTop: vs(8),
  },
  text: {
    textAlign: 'center',
    alignSelf: 'center',
    width: (width / 1.15) * 0.92,
  },
});
