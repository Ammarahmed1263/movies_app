import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import Button from '../components/ui/Button';
import Icon from 'react-native-vector-icons/Ionicons';
import ENDPOINT, {API_KEY} from '../utils/Constants';
import {useTheme} from '../store/context/ThemeContext';
import CastList from '../components/Details/CastList';
import toVote from '../utils/toVote';
import stringDuration from '../utils/stringDuration';
import jestConfig from '../../jest.config';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

function MovieDetails({route, navigation}) {
  const [details, setDetails] = useState({});
  const [cast, setCast] = useState([]);
  const movieID = route.params.id;
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
        setDetails(response.data);
        setCast(response2.data.cast);
        // console.log(response2.data.cast);
      } catch (err) {
        console.log('failed to fetch details', err);
      }
    })();
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
            locations={[0.5, 0.8]}
            style={{flex: 1}}>
            <View style={styles.imageButtons}>
              <Button onPress={() => navigation.goBack()}>
                <Icon
                  name="arrow-back-outline"
                  size={28}
                  color={colors.paleShade}
                />
              </Button>
              <Button>
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
                    fontSize: 20,
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
            contentContainerStyle={{marginHorizontal: 10}}
            alwaysBounceHorizontal={false}>
            {details.genres.map(genre => (
              <Text
                key={genre.id}
                style={{
                  ...styles.categoryPill,
                  color: colors.primary500,
                  fontFamily: fonts.regular,
                  backgroundColor: colors.primary700,
                }}>
                {genre.name}
              </Text>
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
              style={{flex: 4, marginRight: 10, borderRadius: 18}}>
              <Icon name="play" size={27} color={colors.paleShade} />
              <Text
                style={{
                  fontFamily: fonts.bold,
                  fontSize: 18,
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
                name="share-outline"
                size={32}
                color={colors.secondary600}
              />
            </Button>
          </View>
          <CastList cast={cast} />
          <Text
            style={{
              color: colors.paleShade,
              fontFamily: fonts.regular,
              fontSize: 19,
              marginHorizontal: 10,
            }}>
            {details.overview}
          </Text>
        </View>
      </ScrollView>
    </>
  );
}

export default MovieDetails;

const styles = StyleSheet.create({
  poster: {
    height: 500,
    paddingTop: StatusBar.currentHeight + 10,
  },
  imageButtons: {
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
    fontSize: 40,
    lineHeight: 45,
    maxWidth: 300,
  },
  categoryPill: {
    fontSize: 15,
    marginHorizontal: 5,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 15,
  },
});
