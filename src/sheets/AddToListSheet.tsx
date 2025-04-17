import AppButton from '@atoms/AppButton';
import AppLoading from '@atoms/AppLoading';
import AppText from '@atoms/AppText';
import {isIOS} from '@constants';
import {useTheme} from '@contexts/ThemeContext';
import useDebouncedSearch from '@hooks/useDebouncedSearch';
import useNetworkStatus from '@hooks/useNetworkStatus';
import EmptySearch from '@molecules/EmptySearch';
import MovieListItem from '@molecules/MovieListItem';
import SearchBar from '@molecules/SearchBar';
import MoviesList from '@organisms/MoviesList';
import SearchExplore from '@organisms/SearchExplore';
import {
  addMovieToList,
  getListById,
  removeMovieFromlist,
} from '@services/listsService';
import {height, hs, vs, width} from '@styles/metrics';
import LottieView from 'lottie-react-native';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {KeyboardAvoidingView, StyleSheet, View} from 'react-native';
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
  const {results, status, loadMore} = useDebouncedSearch(keyword);
  const isConnected = false;
  // const isConnected = useNetworkStatus();

  const toggleItem = (movie: MovieSummary, exists: boolean) => {
    if (exists) {
      removeMovieFromlist(movie.id, id);
    } else {
      addMovieToList(movie, id);
    }
  };

  const renderItem = ({item}: {item: MovieSummary}) => {
    const exists = movies.some((movie: MovieSummary) => movie.id === item.id);
    const movie: MovieSummary = {
      id: item.id,
      title: item.title,
      overview: item.overview,
      poster_path: item.poster_path ?? null,
    };

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
    if (!keyword && isConnected) {
      return <SearchExplore renderMovie={renderItem} />;
    }

    if (!isConnected) {
      return (
        <View style={{alignItems: 'center', paddingHorizontal: hs(20)}}>
          <LottieView
            source={require('../assets/lottie/no_wifi.json')}
            style={{width: width - hs(20), height: width - hs(20)}}
            autoPlay
            loop
          />
          <AppText style={styles.noInternet} variant="heading">
            {t('no_network')}
          </AppText>
          <AppText style={styles.noInternet}>{t('no_network_msg')}</AppText>
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
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="none"
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
      statusBarTranslucent={false}
      initialSnapIndex={0}
      gestureEnabled={false}>
      <KeyboardAvoidingView
        behavior={isIOS ? 'padding' : 'height'}
        style={styles.sheetContainer}>
        <View style={styles.search}>
          <SearchBar
            keyword={keyword}
            setKeyword={setKeyword}
            viewStyle={{width: '75%'}}
            readOnly={!isConnected}
            mic={false}
            {...(!isConnected ? {placeholder: t('no_network_input')} : {})}
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
      </KeyboardAvoidingView>
    </ActionSheet>
  );
};

export default AddToListSheet;

const styles = StyleSheet.create({
  sheetContainer: {
    flexGrow: 1,
    flexShrink: 1,
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
    paddingBottom: isIOS ? vs(20) : vs(70),
  },
  noInternet: {
    textAlign: 'center',
  },
});
