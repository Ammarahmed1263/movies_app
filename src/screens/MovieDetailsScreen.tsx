import {
  View,
  ImageBackground,
  ScrollView,
  StyleSheet,
  StatusBar,
  Linking,
  Alert,
  Share,
  I18nManager,
} from 'react-native';
import {useCallback, useEffect, useState, FC} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '@atoms/AppButton';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useTheme} from '@contexts/ThemeContext';
import CastList from '@organisms/CastList';
import {formatVoteCount, durationToString, getImageUrl} from '@utils/index';
import YoutubeIframe, {getYoutubeMeta} from 'react-native-youtube-iframe';
import TextSeeMore from '@atoms/SeeMoreText';
import {getMovieCredits, getMovieDetails} from '@services/movieDetailsService';
import {getMovieVideos} from '@services/movieService';
import {MovieDetailsScreenProps} from 'types/mainStackTypes';
import {MovieDetails, Trailer} from 'types/movieTypes';
import {width, height} from '@styles/metrics';
import AppText from '@atoms/AppText';
import AppModal from '@atoms/AppModal';

const MovieDetailsScreen: FC<MovieDetailsScreenProps> = ({
  route,
  navigation,
}) => {
  const movieId = route.params.id;
  console.log('movie id here: ', movieId);
  const [details, setDetails] = useState<MovieDetails | undefined>(undefined);
  const [cast, setCast] = useState([]);
  const [trailId, setTrailId] = useState<string>('');
  const [playing, setPlaying] = useState(false);
  const [isFavorite, setFavorite] = useState(false);
  const [videoMeta, setVideoMeta] = useState<{
    title: string | null;
    author: string | null;
  }>({title: null, author: null});
  const {colors} = useTheme();

  useEffect(() => {
    (async () => {
      try {
        const userDoc = await firestore()
          .collection('users')
          .doc(auth().currentUser?.uid)
          .get();

        const favoriteMovies = userDoc.data()?.favoriteMovies || [];
        setFavorite(
          favoriteMovies.some((movie: {id: number}) => movie.id === movieId),
        );
        const response = await getMovieDetails(movieId);

        const response2 = await getMovieCredits(movieId);

        const response3 = await getMovieVideos(movieId);
        // console.log('details here: ', response);
        setDetails(response);
        // console.log('cast here: ', response2.cast);
        setCast(response2.cast);
        // TODO: add more handling
        response3.results.map((video: Trailer) => {
          if (video.type === 'Trailer' && video.site === 'YouTube') {
            console.log(video);
            setTrailId(video.key);
          }
        });
        // console.log('videos here: ', response3.results);
      } catch (err) {
        console.log('failed to fetch details', err);
      }
    })();
  }, []);

  const onStateChange = useCallback((state: string) => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  const handleClose = () => {
    setPlaying(false);
  };

  const handleYoutubeRedirect = useCallback(async () => {
    try {
      const url = `https://www.youtube.com/watch?v=${trailId}`;
      await Linking.openURL(url);
      setPlaying(false);
    } catch (e: any) {
      Alert.alert('error redirecting:', e.request.data);
    }
  }, [trailId]);

  const handleShare = useCallback(async () => {
    try {
      await Share.share(
        {
          title: 'Look what I found!',
          message: `Check out "${details?.title}" Trailer on YouTube: https://www.youtube.com/watch?v=${trailId}`,
          url: `https://www.youtube.com/watch?v=${trailId}`,
        },
        {
          subject: 'Check out this video!',
        },
      );
    } catch (e: any) {
      console.log('ooops error sharing data', e.request.data);
    }
  }, [trailId]);

  const handleAddToFavorite = useCallback(async () => {
    try {
      setFavorite(prev => !prev);
      if (!isFavorite) {
        console.log(
          'data to add: ',
          details?.id,
          details?.title,
          details?.overview,
          getImageUrl(details?.poster_path),
        );
        await firestore()
          .collection('users')
          .doc(auth().currentUser?.uid)
          .set(
            {
              favoriteMovies: firestore.FieldValue.arrayUnion({
                id: details?.id,
                title: details?.title,
                overview: details?.overview,
                poster_path: getImageUrl(details?.poster_path),
              }),
            },
            {merge: true},
          );
      } else {
        await firestore()
          .collection('users')
          .doc(auth().currentUser?.uid)
          .set(
            {
              favoriteMovies: firestore.FieldValue.arrayRemove({
                id: details?.id,
                title: details?.title,
                overview: details?.overview,
                poster_path: getImageUrl(details?.poster_path),
              }),
            },
            {merge: true},
          );
      }
    } catch (error) {
      console.log('details error occurred: ', error);
    } finally {
      const user = await firestore()
        .collection('users')
        .doc(auth().currentUser?.uid)
        .get();
      console.log('user is here: ', user?.data());
    }
  }, [details]);

  if (!details) {
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
        <ImageBackground
          source={{uri: getImageUrl(details.poster_path)}}
          style={styles.poster}
          resizeMode="stretch">
          <LinearGradient
            colors={['transparent', colors.primary500]}
            locations={[0.3, 0.9]}
            style={{flex: 1}}>
            <View style={styles.imageButtons}>
              <Button
                onPress={() => navigation.goBack()}
                style={{
                  ...styles.topButton,
                  backgroundColor: colors.secondaryShadow,
                }}
                customViewStyle={{
                  transform: [{rotate: I18nManager.isRTL ? '180deg' : '0deg'}],
                }}
                customView>
                <Icon name="chevron-back" size={28} color={colors.paleShade} />
              </Button>
              <Button
                style={{
                  ...styles.topButton,
                  backgroundColor: colors.secondaryShadow,
                }}
                onPress={handleAddToFavorite}
                customView>
                <Icon
                  name={isFavorite ? 'heart' : 'heart-outline'}
                  size={28}
                  color={colors.paleShade}
                />
              </Button>
            </View>
            <View style={styles.quickpeak}>
              <AppText
                variant="heading"
                style={{
                  ...styles.movieTitle,
                  color: colors.paleShade,
                }}>
                {details.title}
              </AppText>
              <AppText
                variant="regular"
                style={{
                  color: colors.paleShade,
                }}>
                {`${formatVoteCount(details.vote_average)} · ${durationToString(
                  details.runtime,
                )} · ${details.release_date.split('-')[0]}`}
              </AppText>
            </View>
          </LinearGradient>
        </ImageBackground>
        <View style={{backgroundColor: colors.primary500}}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1, paddingHorizontal: 8}}
            alwaysBounceHorizontal={false}>
            {details.genres.map(genre => (
              <View
                key={genre.id}
                style={{
                  ...styles.categoryPill,
                  backgroundColor: colors.primary700,
                }}>
                <AppText
                  variant="light"
                  style={{
                    ...styles.pillText,
                    color: colors.primary500,
                  }}>
                  {genre.name}
                </AppText>
              </View>
            ))}
          </ScrollView>
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 20,
              marginHorizontal: 10,
              justifyContent: 'space-between',
            }}>
            <Button
              customView
              customViewStyle={{flexDirection: 'row', alignItems: 'center'}}
              style={{flex: 4, marginRight: 10, borderRadius: 18}}
              onPress={() => {
                setPlaying(true);
                getYoutubeMeta(trailId).then(meta =>
                  setVideoMeta({title: meta.title, author: meta.author_name}),
                );
              }}>
              <Icon name="play" size={23} color={colors.paleShade} />
              <AppText
                variant="bold"
                style={{
                  color: colors.paleShade,
                  lineHeight: 35,
                }}>
                Watch Trailer
              </AppText>
            </Button>
            <Button
              customView
              onPress={handleShare}
              style={{
                flex: 1,
                borderRadius: 18,
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
            text={details.overview}
            style={{
              color: colors.paleShade,
              marginHorizontal: 10,
            }}
          />
          <AppText
            variant="heading"
            style={{
              color: colors.paleShade,
              marginHorizontal: 10,
            }}>
            Top Billed Cast
          </AppText>
          {cast && <CastList cast={cast} />}
        </View>
      </ScrollView>

      <AppModal visible={playing} handleClose={handleClose}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <Button flat customView onPress={handleClose}>
            <Icon name="close-circle" size={33} color={colors.primary700} />
          </Button>
        </View>
        <View
          style={{
            overflow: 'hidden',
            borderRadius: 20,
            marginVertical: 10,
          }}>
          <YoutubeIframe
            height={(width * 0.9 - 40) * (9 / 16)}
            width={width * 0.9 - 40}
            videoId={trailId}
            play={playing}
            onChangeState={onStateChange}
          />
        </View>
        <View style={{marginVertical: 5}}>
          <AppText
            variant="bold"
            style={{
              color: colors.paleShade,
            }}>
            {videoMeta.title}
          </AppText>
          <AppText
            variant="light"
            style={{
              color: colors.primary700,
            }}>
            By: {videoMeta.author}
          </AppText>
        </View>
        <View style={{justifyContent: 'flex-end'}}>
          <Button
            customView
            customViewStyle={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            style={{marginBottom: 12}}
            onPress={handleYoutubeRedirect}>
            <Icon name="play" size={24} color={colors.paleShade} />
            <AppText
              variant="bold"
              style={{
                color: colors.paleShade,
                marginTop: 2,
              }}>
              Open On Youtube
            </AppText>
          </Button>
        </View>
      </AppModal>
    </>
  );
};

export default MovieDetailsScreen;

const styles = StyleSheet.create({
  poster: {
    width: width,
    aspectRatio: 3 / 4,
    paddingTop: StatusBar.currentHeight ?? 50 + 10,
  },
  topButton: {
    width: '13%',
    aspectRatio: 1 / 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 52,
    maxWidth: 52,
  },
  imageButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 8,
  },
  quickpeak: {
    position: 'absolute',
    bottom: 10,
    marginLeft: 15,
  },
  movieTitle: {
    fontSize: 37,
    lineHeight: 45,
    maxWidth: 300,
  },
  categoryPill: {
    marginHorizontal: 5,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pillText: {
    // fontSize: 14,
  },
  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(22, 21, 21, 0.8)',
  },
});
