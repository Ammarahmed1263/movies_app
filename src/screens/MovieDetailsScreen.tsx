import Button from '@atoms/AppButton';
import AppLoading from '@atoms/AppLoading';
import AppText from '@atoms/AppText';
import TextSeeMore from '@atoms/SeeMoreText';
import {useTheme} from '@contexts/ThemeContext';
import useMovieDetails from '@hooks/useMovieDetails';
import CastList from '@organisms/CastList';
import CategoriesList from '@organisms/CategoriesList';
import MovieDetailsPoster from '@organisms/MovieDetailsPoster';
import YoutubeModal from '@organisms/YoutubeModal';
import {addFavoriteMovie, removeFavoriteMovie} from '@services/userService';
import {hs, ms, vs} from '@styles/metrics';
import {
  cancelScheduledReminder,
  createYouTubePlaylistUrl,
  scheduleFavoriteReminder,
} from '@utils';
import {FC, useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, Share, StatusBar, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
const Feather = Icon as any;
import Icon2 from 'react-native-vector-icons/Ionicons';
const Ionicons = Icon2 as any;
import {MovieDetailsScreenProps} from 'types/mainStackTypes';
import {movieDetailsFilter} from '../constants';

const MovieDetailsScreen: FC<MovieDetailsScreenProps> = ({
  route,
  navigation,
}) => {
  const movieId = route.params.id;
  const {movieDetails, castMembers, videos, isFavorite, setIsFavorite} =
    useMovieDetails(movieId);
  const [modalVisible, setModalVisible] = useState(false);
  const {colors} = useTheme();
  const {t} = useTranslation();

  const handleShare = useCallback(async () => {
    const playlist = createYouTubePlaylistUrl(videos);
    try {
      await Share.share(
        {
          title: 'Look what I have found!',
          message: `Check out "${movieDetails?.title}" available Trailers on YouTube: ${playlist}`,
          url: playlist,
        },
        {
          subject: 'Check out this video!',
        },
      );
    } catch (e: any) {
      console.log('ooops error sharing data', e.request.data);
    }
  }, [videos]);

  const handleToggleFavorite = useCallback(async () => {
    const prevFavorite = isFavorite;
    setIsFavorite(!isFavorite);
    try {
      if (movieDetails) {
        if (isFavorite) {
          await removeFavoriteMovie(movieDetails.id);
          cancelScheduledReminder(movieDetails.id);
        } else {
          await addFavoriteMovie({
            id: movieDetails.id,
            title: movieDetails.title,
            overview: movieDetails.overview,
            poster_path: movieDetails.poster_path,
          });
          scheduleFavoriteReminder({
            id: movieDetails.id,
            title: movieDetails.title,
            overview: movieDetails.overview,
            poster_path: movieDetails.poster_path,
          });
        }
      }
    } catch (error) {
      console.log('movieDetails error occurred: ', error);
      setIsFavorite(prevFavorite);
    }
  }, [movieDetails, isFavorite]);

  if (!movieDetails) {
    return (
      <AppLoading
        source={require('../assets/lottie/loading_details.json')}
        speed={3.5}
        size={ms(300)}
        style={{
          transform: [{rotate: '-5deg'}],
        }}
        colorFilters={movieDetailsFilter(colors)}
      />
    );
  }

  return (
    <>
      {modalVisible && <StatusBar backgroundColor="rgba(22, 21, 21, 0.8)" />}
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <MovieDetailsPoster
          movieDetails={movieDetails}
          isFavorite={isFavorite}
          onGoBack={() => navigation.goBack()}
          onToggleFavorite={handleToggleFavorite}
          style={{paddingTop: (StatusBar.currentHeight ?? vs(50)) + vs(15)}}
        />

        <CategoriesList categories={movieDetails?.genres || []} />

        <View>
          <View style={styles.buttonsContainer}>
            <Button
              customView
              pressableStyle={{flex: 1}}
              customViewStyle={{flexDirection: 'row', alignItems: 'center'}}
              style={[styles.button, {flex: 4}]}
              onPress={() => setModalVisible(true)}>
              <Ionicons name="play" size={ms(23)} color={colors.paleShade} />
              <AppText
                variant="bold"
                style={{
                  color: colors.paleShade,
                }}>
                {t('watch_trailer')}
              </AppText>
            </Button>
            <Button
              customView
              onPress={handleShare}
              pressableStyle={{flex: 1}}
              style={[
                styles.button,
                {flex: 1, backgroundColor: colors.primary600},
              ]}>
              <Feather name="share" size={30} color={colors.secondary500} />
            </Button>
          </View>
          <TextSeeMore
            variant="body"
            text={movieDetails?.overview || 'No overview found'}
            style={{
              color: colors.paleShade,
              marginHorizontal: hs(10),
            }}
          />

          <CastList
            cast={castMembers}
            title={t('top_billed_cast')}
            viewStyle={styles.cast}
          />
        </View>
      </ScrollView>

      <YoutubeModal
        videos={videos}
        visible={modalVisible}
        handleClose={() => setModalVisible(false)}
      />
    </>
  );
};

export default MovieDetailsScreen;

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    marginVertical: vs(20),
    marginHorizontal: hs(10),
    minHeight: vs(60),
    justifyContent: 'space-between',
  },
  button: {
    marginRight: hs(10),
    borderRadius: ms(10),
  },
  cast: {
    marginVertical: vs(30),
  },
});
