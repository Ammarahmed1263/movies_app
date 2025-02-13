import {useTheme} from '@contexts/ThemeContext';
import {useMoviesByCategory} from '@hooks/useMoviesByCategory';
import MoviesCarousel from '@organisms/MoviesCarousel';
import MoviesSection from '@organisms/MoviesSection';
import MovieVideoSection from '@organisms/MovieVideoSection';
import {vs} from '@styles/metrics';
import {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  RefreshControl,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';

function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const {t} = useTranslation();
  const {theme, colors} = useTheme();
  const {movies: now_playingMovies, loading: now_playingLoading} =
    useMoviesByCategory('now_playing');
  const {movies: trendingMovies, loading: trendingLoading} =
    useMoviesByCategory('trending', 'week');
  const {movies: upcomingMovies, loading: upcomingLoading} =
    useMoviesByCategory('upcoming');
  const {movies: top_ratedMovies, loading: top_ratedLoading} =
    useMoviesByCategory('top_rated');
  const {movies: popularMovies, loading: popularLoading} =
    useMoviesByCategory('popular');

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 5000);
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
        contentContainerStyle={{paddingBottom: vs(70)}}>
        <View>
          <MoviesCarousel movies={trendingMovies} loading={trendingLoading} />
        </View>
        <View>
          <MoviesSection
            movies={now_playingMovies}
            loading={now_playingLoading}
            category="now_playing"
            topic={t('now_playing')}
            seeAll
          />
          <MoviesSection
            movies={top_ratedMovies}
            loading={top_ratedLoading}
            category="top_rated"
            topic={t('top_rated')}
            seeAll
          />
          <MovieVideoSection
            data={upcomingMovies}
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
        </View>
      </ScrollView>
    </>
  );
}

export default HomeScreen;
