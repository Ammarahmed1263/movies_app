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
  const {movies: now_playingMovies, loading: now_playingLoading} =
    useMoviesByCategory('now_playing');
  const {movies: trendingMovies, loading: trendingLoading} =
    useMoviesByCategory('trending', 'day');
  const {movies: upcomingMovies, loading: upcomingLoading} =
    useMoviesByCategory('upcoming');
  const {movies: top_ratedMovies, loading: top_ratedLoading} =
    useMoviesByCategory('top_rated');
  const {movies: popularMovies, loading: popularLoading} =
    useMoviesByCategory('popular');

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
        <View>
          <MoviesCarousel movies={trendingMovies} loading={trendingLoading}/>
        </View>
        <View>
          <MoviesSection
            movies={now_playingMovies}
            loading={now_playingLoading}
            category="now_playing"
            // time_window="day"
            topic={t('now_playing')}
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
