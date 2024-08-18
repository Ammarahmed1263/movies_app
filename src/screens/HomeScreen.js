import {useCallback, useEffect, useState} from 'react';
import {RefreshControl, Text, ScrollView, StatusBar, View} from 'react-native';
import axios from 'axios';
import MoviesList from '../components/home/MoviesSlider';
import ENDPOINT from '../utils/Constants';
import {API_KEY} from '../utils/Constants';
import MoviesCarousel from '../components/home/MoviesCarousel';
import {useTranslation} from 'react-i18next';
import i18n from '../i18n/i18n';
import {useTheme} from '../context/ThemeContext';
// import { useFocusEffect } from '@react-navigation/native';

const options = {
  method: 'GET',
  params: {language: i18n.language === 'ar' ? 'ar-EG' : 'en-US'},
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

function HomeScreen() {
  /*required data from response:
      1- title
      2- backdrop and poster path
      3- genre_ids
      4- id
      5- overview
      6- vote average
    */

  /* TODO: work with useReducer hook here
      handle no network connection*/
  const [now_playing, setnow_playing] = useState([]);
  const [popular, setpopular] = useState([]);
  const [top_rated, settop_rated] = useState([]);
  const [upcoming, setupcoming] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const {t} = useTranslation();
  const {theme} = useTheme();
  // status bar in rest of screens solution
  // useFocusEffect(
  //   useCallback(() => {
  //     StatusBar.setTranslucent(true);
  //     StatusBar.setBackgroundColor('transparent');

  //     return () => {
  //       console.log('ran here')
  //       StatusBar.setTranslucent(false);
  //       StatusBar.setBackgroundColor(colors.primary500);
  //     };
  //   }, [])
  // );

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.request(
          ENDPOINT.movies.now_playing,
          options,
        );
        // console.log(now_playing.data);
        // console.log(response.data.results);
        setnow_playing([...now_playing, ...response.data.results]);

        const response2 = await axios.request(ENDPOINT.movies.popular, options);
        // console.log(now_playing.data);
        setpopular([...popular, ...response2.data.results]);

        const response3 = await axios.request(
          ENDPOINT.movies.top_rated,
          options,
        );
        // console.log(now_playing.data);
        settop_rated([...top_rated, ...response3.data.results]);

        const response4 = await axios.request(
          ENDPOINT.movies.upcoming,
          options,
        );
        // console.log(now_playing.data);
        // console.log(response4.data);
        setupcoming([...upcoming, ...response4.data.results]);
      } catch (e) {
        console.log('failed to retrieve movies', e);
      } finally {
        console.log('fetching APIs data done');
      }
    })();
  }, []);

  // const onRefresh = useCallback(() => {
  //   setRefreshing(true);
  //   setTimeout(() => {
  //     setRefreshing(false);
  //   }, 2000);
  // }, []);

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        // refreshControl={
        //   <RefreshControl
        //     progressViewOffset={15}
        //     refreshing={refreshing}
        //     onRefresh={onRefresh}
        //     colors={['red', 'blue', 'chocolate']}
        //   />
        // }>
      >
        <View style={{flex: 2}}>
          <MoviesCarousel movies={now_playing.slice(0, 10)} />
        </View>
        <View style={{flex: 1}}>
          <MoviesList movies={now_playing} topic={t('now playing')} seeAll />
          <MoviesList movies={top_rated} topic={t('top rated')} seeAll />
          <MoviesList movies={upcoming} topic={t('upcoming')} seeAll />
          <MoviesList movies={popular} topic={t('popular')} seeAll />
        </View>
      </ScrollView>
    </>
  );
}

export default HomeScreen;
