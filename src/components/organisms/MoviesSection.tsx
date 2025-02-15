import Button from '@atoms/AppButton';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {FlatList, I18nManager, StyleSheet, View} from 'react-native';

import AppLoading from '@atoms/AppLoading';
import AppText from '@atoms/AppText';
import {useTheme} from '@contexts/ThemeContext';
import MovieCard from '@molecules/MovieCard';
import {hs, vs} from '@styles/metrics';
import {FC} from 'react';
import {MovieCategory} from 'types/categoryTypes';
import {
  MainTabsNavigationProp,
  MovieListingNavigationProp,
} from 'types/mainStackTypes';
import {Movie, MovieArray} from 'types/movieTypes';

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
  length = 20,
  category = 'now_playing',
  time_window,
}) => {
  const {colors} = useTheme();
  const navigation = useNavigation<MainTabsNavigationProp>();
  const {t} = useTranslation();

  return (
    <View style={{...styles.container, backgroundColor: colors.primary500}}>
      <View style={styles.heading}>
        <AppText variant="heading">{topic}</AppText>
        {seeAll && (
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
            {t('see_all')}
          </Button>
        )}
      </View>
      {loading ? (
        <View style={{alignItems: 'center'}}>
          <AppText variant="heading">{t('Loading...')}</AppText>
        </View>
      ) : (
        <FlatList
          data={movies.slice(0, length)}
          keyExtractor={movie => movie.id + ''}
          ListEmptyComponent={
            loading ? (
              <AppLoading
                source={require('../../assets/lottie/loading_fade.json')}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <AppText variant="subheading">
                  {t('Sorry, no movies found')}
                </AppText>
              </View>
            )
          }
          maxToRenderPerBatch={10}
          scrollEventThrottle={16}
          initialNumToRender={5}
          contentContainerStyle={{
            flexGrow: 1,
            gap: hs(10),
            paddingHorizontal: hs(15),
          }}
          renderItem={renderMovie}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          getItemLayout={(_, index) => ({
            length: 100,
            offset: 100 * index,
            index,
          })}
        />
      )}
    </View>
  );
};

export default MoviesSection;

const styles = StyleSheet.create({
  container: {
    paddingVertical: vs(10),
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginStart: hs(15),
    marginEnd: hs(10),
    marginBottom: vs(10),
  },
  button: {
    textTransform: 'none',
  },
});
