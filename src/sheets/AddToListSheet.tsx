import AppButton from '@atoms/AppButton';
import {useTheme} from '@contexts/ThemeContext';
import {useMoviesByCategory} from '@hooks/useMoviesByCategory';
import useDebouncedSearch from '@hooks/useDebouncedSearch';
import MovieListItem from '@molecules/MovieListItem';
import SearchBar from '@molecules/SearchBar';
import {
  addMovieToList,
  getListById,
  removeMovieFromlist,
} from '@services/listsService';
import {height, hs, vs} from '@styles/metrics';
import {useEffect, useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import ActionSheet, {
  FlatList,
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {MovieSummary} from 'types/movieTypes';

const AddToListSheet = (props: SheetProps<'add-to-list'>) => {
  const {colors} = useTheme();
  const {id} = props.payload;
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState<MovieSummary[]>([]);
  const [disableGesture, setDisableGesture] = useState(false);
  const {movies: topRated} = useMoviesByCategory('trending', 'day');
  const {searchResults, handleSearch} = useDebouncedSearch(search);

  const toggleItem = (movie: MovieSummary, exists: boolean) => {
    if (exists) {
      removeMovieFromlist(movie.id, id);
    } else {
      addMovieToList(movie, id);
    }
    // SheetManager.hide(props.sheetId);
  };

  const renderItem = ({item, index}: {item: MovieSummary; index: number}) => {
    const exists = movies.some((movie: MovieSummary) => movie.id === item.id);
    const movie: MovieSummary = {
      id: item.id,
      title: item.title,
      overview: item.overview,
      poster_path: item.poster_path ?? null,
    };

    console.log('item here', movie);

    return (
      <MovieListItem movie={movie} key={index + movie.id} disabled>
        <AppButton
          customViewStyle={[
            styles.addIcon,
            {backgroundColor: colors.transparent},
          ]}
          style={{marginStart: hs(5)}}
          onPress={() => toggleItem(movie, exists)}
          customView
          flat>
          <Icon
            name={exists ? 'movie-check' : 'movie-open-plus'}
            size={30}
            color={exists ? colors.success : colors.primary700}
          />
        </AppButton>
      </MovieListItem>
    );
  };

  useEffect(() => {
    const unsubscribe = getListById(id, list => {
      setMovies(list.movies);
    });

    return () => unsubscribe();
  }, [id]);

  return (
    <ActionSheet
      id={props.sheetId}
      containerStyle={{backgroundColor: colors.primary500}}
      indicatorStyle={{backgroundColor: colors.primary700}}
      snapPoints={[50, Platform.OS === 'ios' ? 90 : 100]}
      initialSnapIndex={1}
      gestureEnabled={!disableGesture}
      // enableGesturesInScrollView={false}
      headerAlwaysVisible={true}>
      <View style={styles.sheetContainer}>
        <View style={styles.search}>
          <SearchBar
            keyword={search}
            setKeyword={setSearch}
            viewStyle={{width: '75%'}}
          />
          <AppButton
            variant="body"
            style={{flex: 1}}
            onPress={() => SheetManager.hide(props.sheetId)}
            flat>
            Done
          </AppButton>
        </View>
        <FlatList
          keyExtractor={item => item.id.toString()}
          data={searchResults.length ? searchResults : topRated}
          style={[{marginBottom: vs(90), marginTop: vs(10)}]}
          renderItem={renderItem}
          onScrollBeginDrag={() => setDisableGesture(true)}
          onScrollEndDrag={() => setDisableGesture(false)}
          contentContainerStyle={{
            paddingVertical: vs(20),
          }}
          showsVerticalScrollIndicator={false}
        />
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
});
