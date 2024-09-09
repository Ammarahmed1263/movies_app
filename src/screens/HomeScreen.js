import {useCallback, useEffect, useState} from 'react';
import {RefreshControl, Text, ScrollView, StatusBar, View} from 'react-native';
import MoviesSection from '@organisms/MoviesSection';
import MoviesCarousel from '@organisms/MoviesCarousel';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@contexts/ThemeContext';
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
  const [isLoading, setIsLoading] = useState(true);
  const {t} = useTranslation();
  const {theme, colors} = useTheme();

  useEffect(() => {
    console.log('fetching started');
    setIsLoading(true);
    (async () => {
      try {
        const [
          nowPlayingResponse,
          popularResponse,
          topRatedResponse,
          upcomingResponse,
        ] = await Promise.allSettled([
          getNowPlaying(),
          getPopular(),
          getTopRated(),
          getUpcoming(),
        ]);
        setnow_playing(nowPlayingResponse.value.results)
        setpopular(popularResponse.value.results)
        settop_rated(topRatedResponse.value.results)
        setupcoming(upcomingResponse.value.results)
      } catch (e) {
        console.log('Full error object:', e);
      } finally {
        console.log('fetching APIs data done');
        setIsLoading(false);
      }
    })();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 5000);
  }, []);

  if (isLoading) {
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
            colors={[colors.secondaryShadow, colors.secondary600]}
            tintColor={colors.primary500}
            progressBackgroundColor={colors.primary500}
          />
        }>
        <View style={{flex: 1.5}}>
          <MoviesCarousel movies={now_playing?.slice(0, 8)} />
        </View>
        <View style={{flex: 1}}>
          <MoviesSection movies={now_playing} topic={t('now playing')} seeAll />
          <MoviesSection movies={popular} topic={t('popular')} seeAll />
          <MoviesSection movies={top_rated} topic={t('top rated')} seeAll />
          <MoviesSection movies={upcoming} topic={t('upcoming')} seeAll />
        </View>
      </ScrollView>
    </>
  );
}

export default HomeScreen;
