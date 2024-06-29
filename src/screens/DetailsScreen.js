import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  StyleSheet,
  StatusBar,
  Modal,
  Pressable,
} from 'react-native';
import {useCallback, useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import Button from '../components/ui/Button';
import Icon from 'react-native-vector-icons/Ionicons';
import ENDPOINT, {API_KEY} from '../utils/Constants';
import {useTheme} from '../store/context/ThemeContext';
import CastList from '../components/Details/CastList';
import toVote from '../utils/toVote';
import stringDuration from '../utils/stringDuration';
import YoutubeIframe from 'react-native-youtube-iframe';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

function MovieDetails({route, navigation}) {
  const movieID = route.params.id;
  console.log('current id', movieID);
  const [details, setDetails] = useState({});
  const [cast, setCast] = useState([]);
  const [trailId, setTrailId] = useState(null);
  const [playing, setPlaying] = useState(false);
  const {colors, fonts} = useTheme();

  // console.log(details);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.request(
          ENDPOINT.details + movieID,
          options,
        );

        const response2 = await axios.request(
          ENDPOINT.details + movieID + '\\credits',
          options,
        );

        const response3 = await axios.request(
          ENDPOINT.movies.videos + movieID + '\\videos',
          options,
        );
        setDetails(response.data);
        setCast(response2.data.cast);
        // TODO: iterate to get the key of the type trailer
        setTrailId(response3.data.results[0].key);
        console.log(response3.data.results[0].key);
        // console.log(response2.data.cast);
      } catch (err) {
        console.log('failed to fetch details', err);
      }
    })();
  }, []);

  const onStateChange = useCallback((state) => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  if (Object.keys(details).length === 0) {
    return <Text>Loading</Text>;
  }

  return (
    <>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={{uri: ENDPOINT.image + details.poster_path}}
          style={styles.poster}
          resizeMode="stretch">
          <LinearGradient
            colors={['transparent', colors.primary500]}
            locations={[0.3, 0.9]}
            style={{flex: 1}}>
            <View style={styles.imageButtons}>
              <Button onPress={() => navigation.goBack()} style={styles.topButton} customView>
                <Icon
                  name="arrow-back-outline"
                  size={28}
                  color={colors.paleShade}
                />
              </Button>
              <Button style={styles.topButton} customView>
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
                  {`${toVote(details.vote_average)} · ${stringDuration(
                    details.runtime,
                  )} · ${details.release_date.split('-')[0]}`}
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
              <View key={genre.id} style={{...styles.categoryPill,backgroundColor: colors.primary700}}>
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
              onPress={() => setPlaying(true)}
              >
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
          <CastList cast={cast} />
          <Text
            style={{
              color: colors.paleShade,
              fontFamily: fonts.regular,
              fontSize: 17,
              marginHorizontal: 10,
            }}>
            {details.overview}
          </Text>
        </View>
      </ScrollView>

      <Modal animationType='slide' visible={playing} onRequestClose={() => setPlaying(false)}>
          <Pressable onPress={() => setPlaying(false)} style={{...styles.centeredView, backgroundColor: colors.primary500}}>
              <View style={{flex: 1}} />
          </Pressable>
          
          {trailId !== null && <View style={{...styles.modalView, shadowColor: colors.secondary500}}>
            <YoutubeIframe
              height={200}
              width={350}
              play={playing}
              videoId={`${trailId}`}
              onChangeState={onStateChange}
              initialPlayerParams={{color: 'blue'}}
            />
          </View>}
      </Modal>
    </>
  );
}

export default MovieDetails;

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
    marginTop: 5,
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
  },
  modalView: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 250,
    borderRadius: 20,
    margin: 10,
    padding: 10,
    elevation: 9,
  },
});
