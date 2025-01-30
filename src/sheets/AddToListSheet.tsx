import AppButton from '@atoms/AppButton';
import AppLoading from '@atoms/AppLoading';
import AppText from '@atoms/AppText';
import {useTheme} from '@contexts/ThemeContext';
import useDebouncedSearch from '@hooks/useDebouncedSearch';
import {useMoviesByCategory} from '@hooks/useMoviesByCategory';
import EmptySearch from '@molecules/EmptySearch';
import MovieListItem from '@molecules/MovieListItem';
import SearchBar from '@molecules/SearchBar';
import MoviesList from '@organisms/MoviesList';
import {
  addMovieToList,
  getListById,
  removeMovieFromlist,
} from '@services/listsService';
import {height, hs, vs} from '@styles/metrics';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Platform, StyleSheet, View} from 'react-native';
import ActionSheet, {
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {MovieSummary} from 'types/movieTypes';

const AddToListSheet = (props: SheetProps<'add-to-list'>) => {
  const {colors} = useTheme();
  const {id} = props.payload;
  const {t} = useTranslation();
  const [keyword, setKeyword] = useState('');
  const [movies, setMovies] = useState<MovieSummary[]>([]);
  const [disableGesture, setDisableGesture] = useState(false);
  const {movies: trending} = useMoviesByCategory('trending', 'day');
  const {results, status, loadMore} = useDebouncedSearch(keyword);

  const toggleItem = (movie: MovieSummary, exists: boolean) => {
    if (exists) {
      removeMovieFromlist(movie.id, id);
    } else {
      addMovieToList(movie, id);
    }
    // SheetManager.hide(props.sheetId);
  };

  const renderItem = ({item}: {item: MovieSummary}) => {
    const exists = movies.some((movie: MovieSummary) => movie.id === item.id);
    const movie: MovieSummary = {
      id: item.id,
      title: item.title,
      overview: item.overview,
      poster_path: item.poster_path ?? null,
    };

    console.log('item here', movie);

    return (
      <MovieListItem
        movie={movie}
        onPress={() => toggleItem(movie, exists)}
        key={movie.id}>
        <View style={[styles.addIcon, {backgroundColor: colors.transparent}]}>
          <Icon
            name={exists ? 'movie-check' : 'movie-open-plus'}
            size={30}
            color={exists ? colors.success : colors.primary700}
          />
        </View>
      </MovieListItem>
    );
  };

  useEffect(() => {
    const unsubscribe = getListById(id, list => {
      setMovies(list.movies);
    });

    return () => unsubscribe();
  }, [id]);

  const showLoading = (size: number, speed: number) => {
    return (
      <AppLoading
        source={require('../assets/lottie/loading_fade.json')}
        size={size}
        speed={speed}
      />
    );
  };

  const renderContent = () => {
    if (!keyword) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <AppText variant="heading">Search for movies</AppText>
        </View>
      );
    }

    if (status === 'searching') {
      return showLoading(70, 1.8);
    }

    if (status === 'empty') {
      return <EmptySearch keyword={keyword} />;
    }

    return (
      <MoviesList
        data={results as MovieSummary[]}
        renderItem={renderItem}
        onEndReached={loadMore}
        onEndReachedThreshold={0.7}
        contentContainerStyle={[styles.contentContainer]}
        snapStyle={{bottom: vs(70)}}
        ListFooterComponent={
          status === 'paginating' ? showLoading(35, 2.5) : null
        }
      />
    );
  };

  return (
    <ActionSheet
      id={props.sheetId}
      containerStyle={{backgroundColor: colors.primary500}}
      indicatorStyle={{backgroundColor: colors.primary700}}
      snapPoints={[50, Platform.OS === 'ios' ? 90 : 100]}
      initialSnapIndex={1}
      gestureEnabled={false}
      headerAlwaysVisible={true}>
      <View style={styles.sheetContainer}>
        <View style={styles.search}>
          <SearchBar
            keyword={keyword}
            setKeyword={setKeyword}
            viewStyle={{width: '75%'}}
          />
          <AppButton
            variant="body"
            style={{flex: 1}}
            onPress={() => SheetManager.hide(props.sheetId)}
            flat>
            {t('done')}
          </AppButton>
        </View>

        {renderContent()}
      </View>
    </ActionSheet>
  );
};

export default AddToListSheet;

const styles = StyleSheet.create({
  sheetContainer: {
    paddingTop: vs(10),
    minHeight: height * 0.8,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: hs(10),
  },
  addIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: hs(4),
    borderRadius: hs(8),
  },
  columnWrapper: {
    justifyContent: 'flex-start',
    gap: hs(10),
    marginVertical: vs(12),
  },
  contentContainer: {
    flexGrow: 1,
    paddingTop: vs(10),
    paddingBottom: Platform.OS === 'ios' ? vs(20) : vs(70),
  },
});
