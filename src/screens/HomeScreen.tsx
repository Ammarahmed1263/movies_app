import {useTheme} from '@contexts/ThemeContext';
import {useMoviesList} from '@hooks/useMoviesList';
import GenresSections from '@organisms/GenresSections';
import MoviesCarousel from '@organisms/MoviesCarousel';
import MoviesSection from '@organisms/MoviesSection';
import MovieVideoSection from '@organisms/MovieVideoSection';
import {vs} from '@styles/metrics';
import {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {RefreshControl, ScrollView, StatusBar} from 'react-native';
import {MovieArray} from 'types/movieTypes';

function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const {t} = useTranslation();
  const {theme, colors} = useTheme();

  const nowPlaying = useMoviesList('category', 'now_playing');
  const trending = useMoviesList('category', 'trending', 'week');
  const upcoming = useMoviesList('category', 'upcoming');
  const topRated = useMoviesList('category', 'top_rated');
  const popular = useMoviesList('category', 'popular');

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([
      nowPlaying.refetch(),
      trending.refetch(),
      upcoming.refetch(),
      topRated.refetch(),
      popular.refetch(),
    ]).finally(() => setRefreshing(false));
  }, [
    nowPlaying.refetch,
    trending.refetch,
    upcoming.refetch,
    topRated.refetch,
    popular.refetch,
  ]);

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
          movies={trending.movies as MovieArray}
          loading={trending.loading}
        />

        <MoviesSection
          movies={nowPlaying.movies as MovieArray}
          loading={nowPlaying.loading}
          category="now_playing"
          topic={t('now_playing')}
          seeAll
        />

        <GenresSections refreshing={refreshing} />

        <MoviesSection
          movies={topRated.movies}
          loading={topRated.loading}
          category="top_rated"
          topic={t('top_rated')}
          seeAll
        />

        <MovieVideoSection
          movies={upcoming.movies}
          loading={upcoming.loading}
          category="upcoming"
          topic={t('upcoming')}
          seeAll
        />

        <MoviesSection
          movies={popular.movies}
          loading={popular.loading}
          category="popular"
          topic={t('popular')}
          seeAll
        />
      </ScrollView>
    </>
  );
}

export default HomeScreen;
