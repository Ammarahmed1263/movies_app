import {useCallback, useEffect, useState} from 'react';
import {RefreshControl, Text, ScrollView, StatusBar, View} from 'react-native';
import MoviesSection from '@organisms/MoviesSection';
import MoviesCarousel from '@organisms/MoviesCarousel';
import {useTranslation} from 'react-i18next';
import { useTheme } from '@contexts/ThemeContext';
import {
  getNowPlaying,
  getPopular,
  getTopRated,
  getUpcoming,
} from '@services/movieService';

function HomeScreen() {
  /* TODO: work with useReducer hook here
      handle no network connection*/
  const [now_playing, setnow_playing] = useState([]);
  const [popular, setpopular] = useState([]);
  const [top_rated, settop_rated] = useState([]);
  const [upcoming, setupcoming] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const {t} = useTranslation();
  const { theme, colors} = useTheme();
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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

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
        refreshControl={
          <RefreshControl
            progressViewOffset={StatusBar.currentHeight}
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['red', 'blue', 'chocolate', 'white']}
            tintColor={colors.primary500}
            progressBackgroundColor={colors.primary500}
          />
        }>
      {/* > */}
        <View style={{flex: 2}}>
          <MoviesCarousel movies={now_playing?.slice(0, 8)} />
        </View>
        <View style={{flex: 1}}>
          <MoviesSection movies={now_playing} topic={t('now playing')} seeAll />
          <MoviesSection movies={top_rated} topic={t('top rated')} seeAll />
          <MoviesSection movies={upcoming} topic={t('upcoming')} seeAll />
          <MoviesSection movies={popular} topic={t('popular')} seeAll />
        </View>
      </ScrollView>
    </>
  );
}

export default HomeScreen;
