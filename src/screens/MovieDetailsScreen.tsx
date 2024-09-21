import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  StyleSheet,
  StatusBar,
  Modal,
  Dimensions,
  Pressable,
  Linking,
  Alert,
  Share,
} from 'react-native';
import {useCallback, useEffect, useState, useRef, FC} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '@atoms/AppButton/AppButton';
import {useTheme} from '@contexts/ThemeContext';
import CastList from '@organisms/CastList';
import {formatVoteCount, durationToString, getImageUrl} from '@utils';
import YoutubeIframe, {getYoutubeMeta} from 'react-native-youtube-iframe';
import TextSeeMore from '@atoms/SeeMoreText/SeeMoreText';
import Heading from '@atoms/AppHeadingText/AppHeading';
import {getMovieCredits, getMovieDetails} from '@services/movieDetailsService';
import {getMovieVideos} from '@services/movieService';
import {MovieDetailsScreenProps} from 'types/mainStackTypes';

const MovieDetailsScreen: FC<MovieDetailsScreenProps> = ({
  route,
  navigation,
}) => {
  const movieId = route.params.id;
  const [details, setDetails] = useState({});
  const [cast, setCast] = useState([]);
  const [trailId, setTrailId] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [contentDimensions, setContentDimensions] = useState({});
  const [videoMeta, setVideoMeta] = useState({title: null, author: null});
  const modalRef = useRef(null);
  const {colors, fonts} = useTheme();
  const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

  useEffect(() => {
    (async () => {
      try {
        const response = await getMovieDetails(movieId);

        const response2 = await getMovieCredits(movieId);

        const response3 = await getMovieVideos(movieId);
        setDetails(response);
        setCast(response2.cast);
        // TODO: add more handling
        response3.results.map(video => {
          if (video.type === 'Trailer' && video.site === 'YouTube') {
            console.log(video);
            setTrailId(video.key);
          }
        });
        // console.log(response2.data.cast);
      } catch (err) {
        console.log('failed to fetch details', err);
      }
    })();
  }, []);

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  useEffect(() => {
    if (playing && modalRef.current) {
      setTimeout(() => {
        modalRef.current.measureInWindow((x, y, width, height) => {
          console.log('calculated', {x, y, width, height});
          setContentDimensions({x, y, width, height});
        });
      }, 300);
    }
  }, [playing]);

  const handleOverlayPress = evt => {
    const {pageX, pageY} = evt.nativeEvent;
    if (
      pageX < contentDimensions.x ||
      pageX > contentDimensions.x + contentDimensions.width ||
      pageY < contentDimensions.y ||
      pageY > contentDimensions.y + contentDimensions.height
    ) {
      setPlaying(false);
    }
  };

  // TODO: know why canOpenURL was always
  const handleYoutubeRedirect = useCallback(async () => {
    try {
      const url = `https://www.youtube.com/watch?v=${trailId}`;
      await Linking.openURL(url);
      setPlaying(false);
    } catch (e) {
      Alert.alert('error redirecting:', e.request.data);
    }
  }, [trailId]);

  const handleShare = useCallback(async () => {
    try {
      await Share.share(
        {
          title: 'Look what I found!',
          message: `Check out "${details.title}" Trailer on YouTube: https://www.youtube.com/watch?v=${trailId}`,
          url: `https://www.youtube.com/watch?v=${trailId}`,
        },
        {
          subject: 'Check out this video!',
        },
      );
    } catch (e) {
      console.log('ooops error sharing data', e.request.data);
    }
  }, [trailId]);

  if (Object.keys(details).length === 0) {
    return <Text>Loading</Text>;
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
                customView>
                <Icon
                  name="arrow-back-outline"
                  size={28}
                  color={colors.paleShade}
                />
              </Button>
              <Button
                style={{
                  ...styles.topButton,
                  backgroundColor: colors.secondaryShadow,
                }}
                customView>
                <Icon name="heart-outline" size={28} color={colors.paleShade} />
              </Button>
            </View>
            <View style={styles.quickpeak}>
              <Text
                style={{
                  ...styles.movieTitle,
                  color: colors.paleShade,
                  fontFamily: fonts.bold,
                }}>
                {details.title}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    color: colors.paleShade,
                    fontFamily: fonts.regular,
                    fontSize: 17,
                    lineHeight: 28,
                  }}>
                  {`${formatVoteCount(
                    details.vote_average,
                  )} · ${durationToString(details.runtime)} · ${
                    details.release_date.split('-')[0]
                  }`}
                </Text>
              </View>
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
                <Text
                  style={{
                    ...styles.pillText,
                    color: colors.primary500,
                    fontFamily: fonts.regular,
                  }}>
                  {genre.name}
                </Text>
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
              customViewStyle={{flexDirection: 'row', paddingVertical: 4}}
              style={{flex: 4, marginRight: 10, borderRadius: 18}}
              onPress={() => {
                setPlaying(true);
                getYoutubeMeta(trailId).then(meta =>
                  setVideoMeta({title: meta.title, author: meta.author_name}),
                );
              }}>
              <Icon name="play" size={23} color={colors.paleShade} />
              <Text
                style={{
                  fontFamily: fonts.bold,
                  fontSize: 17,
                  color: colors.paleShade,
                }}>
                Watch Trailer
              </Text>
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
            text={details.overview}
            maxChars={150}
            style={{
              color: colors.paleShade,
              fontFamily: fonts.regular,
              fontSize: 16,
              marginHorizontal: 10,
            }}
          />
          <Heading
            style={{
              color: colors.paleShade,
              fontFamily: fonts.bold,
              marginHorizontal: 10,
            }}>
            Top Cast
          </Heading>
          {cast && <CastList cast={cast.slice(0, 15)} />}
        </View>
      </ScrollView>

      <Modal
        animationType="none"
        visible={playing}
        transparent
        onRequestClose={handleOverlayPress}>
        <Pressable
          onPress={handleOverlayPress}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(22, 21, 21, 0.8)',
          }}>
          <View
            ref={modalRef}
            style={{
              width: screenWidth * 0.9,
              maxHeight: screenHeight * 0.65,
              backgroundColor: colors.primary500,
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 30,
              borderColor: colors.secondary600,
              borderWidth: 1,
              elevation: 6,
              shadowColor: colors.secondary600,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <Button flat customView onPress={() => setPlaying(false)}>
                <Icon name="close-circle" size={33} color={colors.primary700} />
              </Button>
            </View>
            <View
              style={{
                width: screenWidth * 0.9 - 40,
                aspectRatio: 16 / 9,
                overflow: 'hidden',
                borderRadius: 20,
                marginVertical: 10,
              }}>
              <YoutubeIframe
                width="100%"
                height="100%"
                videoId={trailId}
                play={playing}
                onChangeState={onStateChange}
              />
            </View>
            <View style={{marginVertical: 5}}>
              <Text
                style={{
                  fontFamily: fonts.bold,
                  color: colors.paleShade,
                  fontSize: 21,
                }}>
                {videoMeta.title}
              </Text>
              <Text
                style={{
                  fontFamily: fonts.light,
                  color: colors.primary700,
                  fontSize: 17,
                }}>
                By: {videoMeta.author}
              </Text>
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
                <Icon name="play" size={23} color={colors.paleShade} />
                <Text
                  style={{
                    fontFamily: fonts.bold,
                    fontSize: 17,
                    color: colors.paleShade,
                  }}>
                  Open On Youtube
                </Text>
              </Button>
            </View>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

export default MovieDetailsScreen;

const styles = StyleSheet.create({
  poster: {
    height: 470,
    paddingTop: StatusBar.currentHeight + 10,
  },
  topButton: {
    width: '13%',
    height: '12%',
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
    fontSize: 14,
  },
  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(22, 21, 21, 0.8)',
  },
  modalView: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 250,
    borderRadius: 15,
    overflow: 'hidden',
    marginLeft: 25,
    // elevation: 9,
    backgroundColor: 'yellow',
  },
});