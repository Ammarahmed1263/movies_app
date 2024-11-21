import { FlatList, View, StyleSheet, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import Button from '@atoms/AppButton';

import MovieCard from '@molecules/MovieCard';
import { useTheme } from '@contexts/ThemeContext';
import { FC, useEffect, useState } from 'react';
import { Movie, MovieArray } from 'types/movieTypes';
import { MovieListingNavigationProp } from 'types/mainStackTypes';
import AppText from '@atoms/AppText';
import { MovieCategory } from 'types/categoryTypes';
import AppLoading from '@atoms/AppLoading';
import { hs, vs } from '@styles/metrics';

interface MoviesSectionProps {
  movies: MovieArray;
  topic: string;
  loading?: boolean;
  seeAll?: boolean;
  length?: number;
  category?: MovieCategory;
  time_window?: 'day' | 'week';
}

const renderMovie = ({ item }: { item: Movie }) => {
  return <MovieCard movie={item} />;
};
const MoviesSection: FC<MoviesSectionProps> = ({
  movies,
  loading,
  topic,
  seeAll = false,
  length = 20,
  category,
  time_window,
}) => {
  const { colors } = useTheme();
  const navigation = useNavigation<MovieListingNavigationProp>();
  const { t } = useTranslation();

  return (
    <View style={{ ...styles.container, backgroundColor: colors.primary500 }}>
      <View style={styles.heading}>
        <AppText variant="heading">{topic}</AppText>
        {seeAll && category && (
          <Button
            variant="body"
            textStyle={{
              ...styles.button,
              color: colors.secondary500,
            }}
            onPress={() =>
              navigation.navigate('MovieListing', { category, time_window })
            }
            flat>
            {t('see_all')}
          </Button>
        )}
      </View>
      {loading ?
        <View style={{ alignItems: 'center' }}>
          <AppText variant='heading'>{t('Loading...')}</AppText>
        </View>
        :
        <FlatList
          data={movies.slice(0, length)}
          keyExtractor={movie => movie.id + ''}
          ListEmptyComponent={
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              {loading ? (
                <AppLoading source={require('../../assets/lottie/loading_fade.json')}/>
              ) : (
                <AppText variant='subheading'>{t('Sorry, no movies found')}</AppText>
              )}
            </View>
          }
          maxToRenderPerBatch={10}
          scrollEventThrottle={16}
          initialNumToRender={5}
          windowSize={5}
          contentContainerStyle={{ flexGrow: 1, gap: hs(10), paddingHorizontal: hs(15) }}
          renderItem={renderMovie}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          getItemLayout={(_, index) => ({ length: 100, offset: 100 * index, index })}
        />}
    </View>
  );
};

export default MoviesSection;

const styles = StyleSheet.create({
  container: {
    paddingBottom: vs(20),
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginStart: hs(20),
    marginEnd: hs(10),
  },
  button: {
    textTransform: 'none',
  },
});
