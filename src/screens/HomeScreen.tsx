import {useCallback} from 'react';
import {ScrollView, StatusBar, View} from 'react-native';
import MoviesCarousel from '@organisms/MoviesCarousel';
import MoviesSection from '@organisms/MoviesSection';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@contexts/ThemeContext';
import {useMoviesByCategory} from '@hooks/useMoviesByCategory';
import {useAppSelector} from '@hooks/useRedux';
import {RootState} from '@redux/types';

function HomeScreen() {
  const {t} = useTranslation();
  const {theme} = useTheme();
  const {movies: trendingMovies, loading: trendingLoading} =
    useMoviesByCategory('trending', 'day');
  const {movies: upcomingMovies, loading: upcomingLoading} =
    useMoviesByCategory('upcoming');
  const {movies: top_ratedMovies, loading: top_ratedLoading} =
    useMoviesByCategory('top_rated');
  const {movies: popularMovies, loading: popularLoading} =
    useMoviesByCategory('popular');
  const state = useAppSelector((state: RootState) => state.movies);

  const onRefresh = useCallback(() => {
    setTimeout(() => {}, 5000);
  }, []);

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
        //     progressViewOffset={StatusBar.currentHeight}
        //     refreshing={state.refreshing}
        //     onRefresh={onRefresh}
        //     colors={[colors.secondaryShadow, colors.secondary600]}
        //     tintColor={colors.primary500}
        //     progressBackgroundColor={colors.primary500}
        //   />
        // }
      >
        {/* <View style={{flex: 3}}>
          <MoviesCarousel category="now_playing" />
        </View> */}
        <View style={{flex: 1, marginTop: 100}}>
          <MoviesSection
            movies={trendingMovies}
            loading={trendingLoading}
            category="trending"
            time_window="day"
            topic={t('trending_today')}
            seeAll
          />
          <MoviesSection
            movies={upcomingMovies}
            loading={upcomingLoading}
            category="upcoming"
            topic={t('upcoming')}
            seeAll
          />
          <MoviesSection
            movies={top_ratedMovies}
            loading={top_ratedLoading}
            category="top_rated"
            topic={t('top_rated')}
            seeAll
          />
          <MoviesSection
            movies={popularMovies}
            loading={popularLoading}
            category="popular"
            topic={t('popular')}
            seeAll
          />
        </View>
      </ScrollView>
    </>
  );
}

export default HomeScreen;
