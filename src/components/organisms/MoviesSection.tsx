import {FlatList, View, StyleSheet} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import Button from '@atoms/AppButton';

import MovieCard from '@molecules/MovieCard';
import { useTheme } from '@contexts/ThemeContext';
import AppHeading from '@atoms/AppHeading';
import { FC } from 'react';
import { Movie, MovieArray } from 'types/movieTypes';
import { MainTabsNavigationProp, MovieListingNavigationProp } from 'types/mainStackTypes';

const renderMovie = ({item}: {item: Movie}) => {
  return <MovieCard movie={item} />;
};

interface MoviesSectionProps {
  movies: MovieArray,
  topic: string
  seeAll?: boolean
  length?: number
  category?: string
}

const MoviesSection: FC<MoviesSectionProps> = ({movies, topic, seeAll = false, length = 10, category}) => {
  const {colors, fonts} = useTheme();
  const navigation = useNavigation<MovieListingNavigationProp>();
  const { t } = useTranslation();
  
  return (
    <View style={{...styles.container, backgroundColor: colors.primary500}}>
      <View style={styles.heading}>
        <AppHeading>{topic}</AppHeading>
        {seeAll && <Button
          textStyle={{
            ...styles.button,
            color: colors.secondary500,
            fontFamily: fonts.light,
          }}
          onPress={() => navigation.navigate('MovieListing', {category})}
          flat>
          {t('see all')}
        </Button>}
      </View>
      <FlatList
        data={movies}
        contentContainerStyle={{flexGrow: 1, gap: 15, paddingHorizontal: 20}}
        renderItem={renderMovie}
        showsHorizontalScrollIndicator={false}
        horizontal
      />
    </View>
  );
}

export default MoviesSection;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    marginStart: 20,
    marginEnd: 8
  },
  button: {
    fontSize: 18,
    textTransform: 'none',
  },
});
