import axios from 'axios';
import {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import ENDPOINT, {API_KEY} from '../utils/Constants';
import {useNavigation} from '@react-navigation/native';
import Button from '../components/atoms/AppButton/AppButton';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../context/ThemeContext';
import TextSeeMore from '../components/atoms/SeeMoreText/SeeMoreText';
import { getGenderString } from '../utils';
import Heading from '../components/atoms/AppHeadingText/AppHeading';
import MoviesList from '../components/home/MoviesList';

const options = {
  method: 'GET',
  params: {language: 'en-US', page: '1'},
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

const CastMemberScreen = ({route}) => {
  const {id} = route.params;
  const [details, setDetails] = useState(null);
  const [credits, setCredits] = useState([]);
  const navigation = useNavigation();
  const {colors, fonts} = useTheme();

  console.log('member id', id);
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.request(
          `https://api.themoviedb.org/3/person/${id}`,
          options,
        );
        const response2 = await axios.request(`https://api.themoviedb.org/3/person/${id}/movie_credits`, options)
        console.log('result here', response2.data);
        setCredits(response2.data.cast)
        setDetails(response.data);
      } catch (e) {
        console.log('member retrieval error', e);
      }
    })();
  }, []);

  if (!details) {
    return <Text>Loading...</Text>;
  }

  return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginHorizontal: 10, paddingTop: StatusBar.currentHeight + 15}}>
          <Button
            onPress={() => navigation.goBack()}
            style={{
              width: '13%',
              height: '12%',
              alignItems: 'center',
              justifyContent: 'center',
              height: 52,
              width: 52,
            }}
            customView>
            <Icon
              name="arrow-back-outline"
              size={28}
              color={colors.paleShade}
            />
          </Button>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <View
            style={{
              ...styles.imageContainer,
              borderColor: colors.secondary500,
              shadowColor: colors.secondary500,
            }}>
            <Image
              source={{uri: ENDPOINT.image + details.profile_path}}
              style={{width: '100%', height: '115%'}}
              resizeMode="cover" />
          </View>
        </View>
        <View style={{alignItems: 'center', marginVertical: 8}}>
          <Text style={{fontFamily: fonts.bold, fontSize: 28, color: colors.paleShade}}>
            {details.name}
          </Text>
          <Text style={{fontFamily: fonts.regular, fontSize: 13, color: colors.paleShade}}>
            {details.place_of_birth}
          </Text>
        </View>
        <View
          style={{...styles.shortDetails, backgroundColor: colors.primary700}}>
          <View style={{...styles.shortItem, borderColor: colors.primary500}}>
            <Text style={{fontFamily: fonts.regular, color: colors.primary500}}>
              Gender
            </Text>
            <Text style={{fontFamily: fonts.light, color: colors.primary500}}>
              {getGenderString(details.gender)}
            </Text>
          </View>
          <View style={{...styles.shortItem, borderColor: colors.primary500}}>
            <Text style={{fontFamily: fonts.regular, color: colors.primary500}}>
              Birthday
            </Text>
            <Text style={{fontFamily: fonts.light, color: colors.primary500}}>
              {details.birthday}
            </Text>
          </View>
          <View style={{...styles.shortItem, borderColor: colors.primary500}}>
            <Text style={{fontFamily: fonts.regular, color: colors.primary500}}>
              Known for
            </Text>
            <Text style={{fontFamily: fonts.light, color: colors.primary500}}>
              {details.known_for_department}
            </Text>
          </View>
          <View
            style={{...styles.shortItem, borderRightWidth: 0, paddingRight: 0}}>
            <Text style={{fontFamily: fonts.regular, color: colors.primary500}}>
              Popularity
            </Text>
            <Text style={{fontFamily: fonts.light, color: colors.primary500}}>
              {Math.round(details.popularity * 10) / 10}
            </Text>
          </View>
        </View>
        <View style={{marginHorizontal: 10, marginVertical: 8}}>
          <Heading>Biography</Heading>
          <TextSeeMore
            style={{
              color: colors.paleShade,
              fontFamily: fonts.regular,
              fontSize: 16,
            }}
            text={details.biography.replace(/\n/g, ' ')}
            maxChars={400}
          />
        </View>
        {credits && <MoviesList movies={credits.sort((a, b) => Number(b.vote_average) - Number(a.vote_average))} length={15} topic='Top Movies'/>}
      </ScrollView>
  );
};

export default CastMemberScreen;

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    overflow: 'hidden',
    width: 230,
    height: 230,
    borderRadius: 125,
    borderWidth: 1,
    elevation: 50,
  },
  shortDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginHorizontal: 10,
    marginVertical: 8,
    padding: 8,
    borderRadius: 40,
  },
  shortItem: {
    paddingRight: 8,
    alignItems: 'center',
    borderRightWidth: 1,
  },
});
