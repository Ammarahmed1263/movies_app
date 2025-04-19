import {useTheme} from '@contexts/ThemeContext';
import {useMoviesList} from '@hooks/useMoviesList';
import GenresSections from '@organisms/GenresSections';
import MoviesCarousel from '@organisms/MoviesCarousel';
import MoviesSection from '@organisms/MoviesSection';
import MovieVideoSection from '@organisms/MovieVideoSection';
import {vs} from '@styles/metrics';
import {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {RefreshControl, ScrollView, StatusBar, View} from 'react-native';
import {MovieArray} from 'types/movieTypes';

function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const {t} = useTranslation();
  const {theme, colors} = useTheme();
  const {
    movies: now_playingMovies,
    loading: now_playingLoading,
    refetch: now_playingRefetch,
  } = useMoviesList('category', 'now_playing');
  const {
    movies: trendingMovies,
    loading: trendingLoading,
    refetch: trendingRefetch,
  } = useMoviesList('category', 'trending', 'week');
  const {
    movies: upcomingMovies,
    loading: upcomingLoading,
    refetch: upcomingRefetch,
  } = useMoviesList('category', 'upcoming');
  const {
    movies: top_ratedMovies,
    loading: top_ratedLoading,
    refetch: top_ratedRefetch,
  } = useMoviesList('category', 'top_rated');
  const {
    movies: popularMovies,
    loading: popularLoading,
    refetch: popularRefetch,
  } = useMoviesList('category', 'popular');

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([
      now_playingRefetch(),
      trendingRefetch(),
      upcomingRefetch(),
      top_ratedRefetch(),
      popularRefetch(),
    ]).finally(() => setRefreshing(false));
  }, []);

  console.log(
    'all loadings: ',
    trendingLoading,
    now_playingLoading,
    upcomingLoading,
    top_ratedLoading,
    popularLoading,
  );

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
        }
        contentContainerStyle={{paddingBottom: vs(90)}}>
        <MoviesCarousel
          movies={trendingMovies as MovieArray}
          loading={trendingLoading}
        />

        <MoviesSection
          movies={now_playingMovies as MovieArray}
          loading={now_playingLoading}
          category="now_playing"
          topic={t('now_playing')}
          seeAll
        />
        <GenresSections refreshing={refreshing} />
        <MoviesSection
          movies={top_ratedMovies}
          loading={top_ratedLoading}
          category="top_rated"
          topic={t('top_rated')}
          seeAll
        />
        <MovieVideoSection
          movies={upcomingMovies}
          loading={upcomingLoading}
          category="upcoming"
          topic={t('upcoming')}
          seeAll
        />
        <MoviesSection
          movies={popularMovies}
          loading={popularLoading}
          category="popular"
          topic={t('popular')}
          seeAll
        />
      </ScrollView>
    </>
  );
}

export default HomeScreen;
