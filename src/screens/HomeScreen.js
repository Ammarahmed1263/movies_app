import {useCallback, useEffect, useState} from 'react';
import {RefreshControl, Text, ScrollView, StatusBar, View} from 'react-native';
import MoviesList from '../components/organisms/MoviesSection';
import MoviesCarousel from '../components/organisms/MoviesCarousel';
import {useTranslation} from 'react-i18next';
import {useTheme} from '../contexts/ThemeContext';
import {
  getNowPlaying,
  getPopular,
  getTopRated,
  getUpcoming,
} from '../api/services/movieService';

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
        const response = await getNowPlaying();
        const response2 = await getPopular();
        const response3 = await getTopRated();
        const response4 = await getUpcoming();
        setnow_playing(response.results);
        setpopular(response2.results);
        settop_rated(response3.results);
        setupcoming(response4.results);
      } catch (e) {
        console.log('Full error object:', e);
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

  if (
    now_playing.length === 0 ||
    popular.length === 0 ||
    top_rated.length === 0 ||
    upcoming.length === 0
  ) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>loading...</Text>
      </View>
    );
  }

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
          <MoviesCarousel movies={now_playing?.slice(0, 8)} />
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
