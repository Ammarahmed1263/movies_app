import {useCallback, useEffect, useReducer, useState} from 'react';
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

const initialState = {
  nowPlaying: {movies: [], page: 1, totalPages: 1},
  popular: {movies: [], page: 1, totalPages: 1},
  topRated: {movies: [], page: 1, totalPages: 1},
  upcoming: {movies: [], page: 1, totalPages: 1},
  loading: false,
  refreshing: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH':
      console.log(state, action)
      return {
        ...state,
        [action.category]: {...state[action.category], movies: [...state[action.category].movies,...action.payload]}
      }
    default:
      break;
  }
}

function HomeScreen() {
  /* TODO: work with useReducer hook here
      handle no network connection*/
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [state, dispatch] = useReducer(reducer, initialState)
  console.log('total state', state.nowPlaying.movies)
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
        dispatch({type: 'FETCH', category: 'nowPlaying', payload: nowPlayingResponse.value.results})
        dispatch({type: 'FETCH', category: 'popular', payload: popularResponse.value.results})
        dispatch({type: 'FETCH', category: 'topRated', payload: topRatedResponse.value.results})
        dispatch({type: 'FETCH', category: 'upcoming', payload: upcomingResponse.value.results})
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
        <View style={{flex: 3}}>
          <MoviesCarousel movies={state.nowPlaying.movies?.slice(0, 8)} />
        </View>
        <View style={{flex: 1}}>
          <MoviesSection movies={state.nowPlaying.movies} topic={t('now playing')} seeAll />
          <MoviesSection movies={state.popular.movies} topic={t('popular')} seeAll />
          <MoviesSection movies={state.topRated.movies} topic={t('top rated')} seeAll />
          <MoviesSection movies={state.upcoming.movies} topic={t('upcoming')} seeAll />
        </View>
      </ScrollView>
    </>
  );
}

export default HomeScreen;
