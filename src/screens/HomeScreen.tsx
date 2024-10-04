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
  getTrending,
  getUpcoming,
} from '@services/movieService';
import AppText from '@atoms/AppText';

const initialState = {
  nowPlaying: {movies: [], page: 1, totalPages: 1},
  popular: {movies: [], page: 1, totalPages: 1},
  topRated: {movies: [], page: 1, totalPages: 1},
  upcoming: {movies: [], page: 1, totalPages: 1},
  trending: {movies: [], page: 1, totalPages: 1},
  loading: false,
  refreshing: false
}

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'FETCH':
      return {
        ...state,
        [action.category]: {...state[action.category], movies: [...state[action.category].movies,...action.payload]}
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: true
      }
    case 'STOP_LOADING':
      return {
        ...state,
        loading: false
      }
    case 'SET_REFRESHING':
      return {
        ...state,
        refreshing: true
      }
    case 'STOP_REFRESHING':
      return {
        ...state,
        refreshing: false
      }
    default:
      break;
  }
}

function HomeScreen() {
  const [state, dispatch] = useReducer(reducer, initialState)
  console.log('state', state.trending.movies)
  const {t} = useTranslation();
  const {theme, colors} = useTheme();

  useEffect(() => {
    console.log('fetching started');
    dispatch({type: 'SET_LOADING'});
    (async () => {
      try {
        const [
          nowPlayingResponse,
          popularResponse,
          topRatedResponse,
          upcomingResponse,
          trendingResponse
        ] = await Promise.allSettled([
          getNowPlaying(),
          getPopular(),
          getTopRated(),
          getUpcoming(),
          getTrending("day")
        ]);

        if (nowPlayingResponse.status === "fulfilled") {
          dispatch({ type: 'FETCH', category: 'nowPlaying', payload: nowPlayingResponse.value.results });
        } else {
          console.error('Failed to fetch now playing movies:', nowPlayingResponse.reason);
        }
        
        if (popularResponse.status === "fulfilled") {
          dispatch({ type: 'FETCH', category: 'popular', payload: popularResponse.value.results });
        } else {
          console.error('Failed to fetch popular movies:', popularResponse.reason);
        }
        
        if (topRatedResponse.status === "fulfilled") {
          dispatch({ type: 'FETCH', category: 'topRated', payload: topRatedResponse.value.results });
        } else {
          console.error('Failed to fetch top-rated movies:', topRatedResponse.reason);
        }
        
        if (upcomingResponse.status === "fulfilled") {
          dispatch({ type: 'FETCH', category: 'upcoming', payload: upcomingResponse.value.results });
        } else {
          console.error('Failed to fetch upcoming movies:', upcomingResponse.reason);
        }

        if (trendingResponse.status === "fulfilled") {
          dispatch({ type: 'FETCH', category: 'trending', payload: trendingResponse.value.results });
        } else {
          console.error('Failed to fetch upcoming movies:', trendingResponse.reason);
        }

      } catch (e) {
        console.log('Full error object:', e);
      } finally {
        console.log('fetching APIs data done');
        dispatch({type: 'STOP_LOADING'});
      }
    })();
  }, []);

  const onRefresh = useCallback(() => {
    dispatch({type: 'SET_REFRESHING'});
    setTimeout(() => {
      dispatch({type: 'STOP_REFRESHING'});
    }, 5000);
  }, []);

  if (state.loading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <AppText variant='heading'>loading...</AppText>
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
            refreshing={state.refreshing}
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
          <MoviesSection category='trending' movies={state.trending.movies} topic={t('trending_today')} seeAll />
          <MoviesSection category='upcoming' movies={state.upcoming.movies} topic={t('upcoming')} seeAll />
          <MoviesSection category='popular' movies={state.popular.movies} topic={t('popular')} seeAll />
          <MoviesSection category='top_rated' movies={state.topRated.movies} topic={t('top_rated')} seeAll />
        </View>
      </ScrollView>
    </>
  );
}

export default HomeScreen;
