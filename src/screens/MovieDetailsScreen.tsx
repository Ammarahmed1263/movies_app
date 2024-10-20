import {View, ScrollView, StatusBar, Share} from 'react-native';
import {useCallback, useState, FC} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '@atoms/AppButton';
import {useTheme} from '@contexts/ThemeContext';
import CastList from '@organisms/CastList';
import TextSeeMore from '@atoms/SeeMoreText';
import {MovieDetailsScreenProps} from 'types/mainStackTypes';
import {hs, ms, vs} from '@styles/metrics';
import AppText from '@atoms/AppText';
import {addFavoriteMovie, removeFavoriteMovie} from '@services/userService';
import useMovieDetails from '@hooks/useMovieDetails';
import YoutubeModal from '@organisms/YoutubeModal';
import CategoriesList from '@organisms/CategoriesList';
import MovieDetailsPoster from '@organisms/MovieDetailsPoster';

const MovieDetailsScreen: FC<MovieDetailsScreenProps> = ({
  route,
  navigation,
}) => {
  const movieId = route.params.id;
  const {movieDetails, castMembers, videos, isFavorite, setIsFavorite} =
    useMovieDetails(movieId);
  const [playing, setPlaying] = useState(false);
  const {colors} = useTheme();

  const onStateChange = useCallback((state: string) => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  const handleShare = useCallback(async () => {
    try {
      await Share.share(
        {
          title: 'Look what I found!',
          message: `Check out "${movieDetails?.title}" Trailer on YouTube: https://www.youtube.com/watch?v=${videos[0].key}`,
          url: `https://www.youtube.com/watch?v=${videos[0].key}`,
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
        } else {
          await addFavoriteMovie({
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
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <AppText variant="heading">loading...</AppText>
      </View>
    );
  }

  return (
    <>
      {playing && <StatusBar backgroundColor="rgba(22, 21, 21, 0.8)" />}
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
          <View
            style={{
              flexDirection: 'row',
              marginVertical: vs(20),
              marginHorizontal: hs(10),
              justifyContent: 'space-between',
            }}>
            <Button
              customView
              customViewStyle={{flexDirection: 'row', alignItems: 'center'}}
              style={{flex: 4, marginRight: hs(10), borderRadius: ms(18)}}
              onPress={() => setPlaying(true)}>
              <Icon name="play" size={ms(23)} color={colors.paleShade} />
              <AppText
                variant="bold"
                style={{
                  color: colors.paleShade,
                  lineHeight: hs(35),
                }}>
                Watch Trailer
              </AppText>
            </Button>
            <Button
              customView
              onPress={handleShare}
              style={{
                flex: 1,
                borderRadius: ms(18),
                backgroundColor: colors.primary600,
              }}>
              <Icon
                name="share-social-outline"
                size={30}
                color={colors.secondary600}
              />
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

          <CastList cast={castMembers} title="Top Billed Cast" />
        </View>
      </ScrollView>

      <YoutubeModal
        videos={videos}
        visible={playing}
        handleClose={() => setPlaying(false)}
        onStateChange={onStateChange}
      />
    </>
  );
};

export default MovieDetailsScreen;