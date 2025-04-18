import Button from '@atoms/AppButton';
import AppLoading from '@atoms/AppLoading';
import AppText from '@atoms/AppText';
import TextSeeMore from '@atoms/SeeMoreText';
import {useTheme} from '@contexts/ThemeContext';
import useMovieDetails from '@hooks/useMovieDetails';
import CastList from '@organisms/CastList';
import CategoriesList from '@organisms/CategoriesList';
import MovieDetailsPoster from '@organisms/MovieDetailsPoster';
import MoviesSection from '@organisms/MoviesSection';
import YoutubeModal from '@organisms/YoutubeModal';
import {hs, ms, vs} from '@styles/metrics';
import {createYouTubePlaylistUrl} from '@utils';
import {FC, useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, Share, StatusBar, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/Ionicons';
import {MovieDetailsScreenProps} from 'types/mainStackTypes';
import {movieDetailsFilter} from '../constants';
const Feather = Icon as any;
const Ionicons = Icon2 as any;

const MovieDetailsScreen: FC<MovieDetailsScreenProps> = ({
  route,
  navigation,
}) => {
  const movieId = route.params.id;
  const {
    movieDetails,
    castMembers,
    videos,
    isFavoriteMovie,
    toggleFavoriteMovie,
    similarMovies,
    loading,
  } = useMovieDetails(movieId);
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

  if (loading || !movieDetails) {
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
          isFavorite={isFavoriteMovie}
          onGoBack={() => navigation.goBack()}
          onToggleFavorite={() => toggleFavoriteMovie(movieDetails)}
          style={{paddingTop: (StatusBar.currentHeight ?? vs(50)) + vs(15)}}
        />

        <CategoriesList categories={movieDetails?.genres || []} />

        <>
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
              <Feather name="share" size={ms(30)} color={colors.secondary500} />
            </Button>
          </View>

          <CastList
            cast={castMembers}
            title={t('top_billed_cast')}
            loading={loading}
          />

          <TextSeeMore
            variant="body"
            text={movieDetails?.overview || 'No overview found'}
            style={{
              color: colors.paleShade,
              marginHorizontal: hs(10),
            }}
          />

          <MoviesSection
            movies={similarMovies.sort(
              (a, b) =>
                Number(b.vote_average) +
                Number(b.popularity) -
                (Number(a.vote_average) + Number(a.popularity)),
            )}
            topic={t('similar_movies')}
            viewStyle={styles.similar}
          />
        </>
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
    marginVertical: vs(15),
    gap: hs(10),
    marginHorizontal: hs(10),
    minHeight: vs(60),
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: ms(10),
  },
  similar: {
    marginBottom: vs(30),
  },
});
