import {FlatList, View, StyleSheet, Text} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import Button from '@atoms/AppButton';

import MovieCard from '@molecules/MovieCard';
import {useTheme} from '@contexts/ThemeContext';
import {FC, useEffect, useState} from 'react';
import {Movie, MovieArray} from 'types/movieTypes';
import {MovieListingNavigationProp} from 'types/mainStackTypes';
import AppText from '@atoms/AppText';
import {MovieCategory} from 'types/categoryTypes';

interface MoviesSectionProps {
  movies: MovieArray;
  topic: string;
  loading?: boolean;
  seeAll?: boolean;
  length?: number;
  category?: MovieCategory;
  time_window?: 'day' | 'week';
}

const renderMovie = ({item}: {item: Movie}) => {
  return <MovieCard movie={item} />;
};
const MoviesSection: FC<MoviesSectionProps> = ({
  movies,
  loading,
  topic,
  seeAll = false,
  length,
  category,
  time_window,
}) => {
  const {colors} = useTheme();
  const navigation = useNavigation<MovieListingNavigationProp>();
  const {t} = useTranslation();

  return (
    <View style={{...styles.container, backgroundColor: colors.primary500}}>
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
              navigation.navigate('MovieListing', {category, time_window})
            }
            flat>
            {t('see all')}
          </Button>
        )}
      </View>
      {loading ?
        <View style={{alignItems: 'center'}}>
          <AppText variant='heading'>{t('Loading...')}</AppText>
        </View>
      :
      <FlatList
        data={length ? movies.slice(0, length) : movies}
        keyExtractor={movie => movie.id + ''}
        maxToRenderPerBatch={10}
        contentContainerStyle={{flexGrow: 1, gap: 15, paddingHorizontal: 20}}
        renderItem={renderMovie}
        showsHorizontalScrollIndicator={false}
        horizontal
      />}
    </View>
  );
};

export default MoviesSection;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginStart: 20,
    marginEnd: 10,
  },
  button: {
    textTransform: 'none',
  },
});
