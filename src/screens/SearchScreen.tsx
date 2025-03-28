import AppLoading from '@atoms/AppLoading';
import AppText from '@atoms/AppText';
import useDebouncedSearch from '@hooks/useDebouncedSearch';
import EmptySearch from '@molecules/EmptySearch';
import SearchBar from '@molecules/SearchBar';
import {hs, vs} from '@styles/metrics';
import {useState} from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {MovieSummary} from 'types/movieTypes';
import MoviesList from '../components/organisms/MoviesList';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import SearchExplore from '@organisms/SearchExplore';

function SearchScreen() {
  const [keyword, setKeyword] = useState('');
  const insets = useSafeAreaInsets();
  const {results, status, loadMore, hasMore, page} =
    useDebouncedSearch(keyword);

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
      return <SearchExplore listContainerStyle={styles.explore} />;
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
        onEndReached={loadMore}
        onEndReachedThreshold={0.7}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={[
          styles.contentContainer,
          {
            paddingBottom:
              Platform.OS === 'android'
                ? vs(45) + insets.bottom + vs(85)
                : vs(85),
          },
        ]}
        numColumns={2}
        snapStyle={{bottom: vs(100)}}
        ListFooterComponent={
          status === 'paginating' ? showLoading(35, 2.5) : null
        }
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar keyword={keyword} setKeyword={setKeyword} />
      {renderContent()}
    </SafeAreaView>
  );
}

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:
      Platform.OS === 'ios'
        ? vs(10)
        : (StatusBar.currentHeight ?? vs(55)) + vs(10),
  },
  loading: {
    backgroundColor: 'red',
  },
  columnWrapper: {
    justifyContent: 'flex-start',
    gap: hs(10),
    marginVertical: vs(12),
  },
  contentContainer: {
    flexGrow: 1,
    marginHorizontal: hs(10),
  },
  explore: {
    paddingBottom:
      (StatusBar.currentHeight ?? vs(55)) +
      (Platform.OS === 'ios' ? vs(10) : vs(25)),
  },
});
