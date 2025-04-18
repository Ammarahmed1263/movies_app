import AppLoading from '@atoms/AppLoading';
import {isIOS} from '@constants';
import useDebouncedSearch from '@hooks/useDebouncedSearch';
import EmptySearch from '@molecules/EmptySearch';
import SearchBar from '@molecules/SearchBar';
import SearchExplore from '@organisms/SearchExplore';
import {hs, vs, width} from '@styles/metrics';
import {useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {MovieSummary} from 'types/movieTypes';
import MoviesList from '../components/organisms/MoviesList';
import AppText from '@atoms/AppText';
import LottieView from 'lottie-react-native';
import useNetworkStatus from '@hooks/useNetworkStatus';
import {use} from 'i18next';
import {useTranslation} from 'react-i18next';

function SearchScreen() {
  const [keyword, setKeyword] = useState('');
  const insets = useSafeAreaInsets();
  const {results, status, loadMore} = useDebouncedSearch(keyword);
  const {t} = useTranslation();
  const isConnected = useNetworkStatus();

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
      return <SearchExplore listContainerStyle={styles.explore} />;
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
        onEndReached={loadMore}
        onEndReachedThreshold={0.7}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={[
          styles.contentContainer,
          {
            paddingBottom: !isIOS ? vs(45) + insets.bottom + vs(85) : vs(85),
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
      <SearchBar
        keyword={keyword}
        setKeyword={setKeyword}
        readOnly={!isConnected}
        mic={isConnected ?? undefined}
        {...(!isConnected ? {placeholder: t('no_network_input')} : {})}
      />
      {renderContent()}
    </SafeAreaView>
  );
}

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: isIOS ? vs(10) : (StatusBar.currentHeight ?? vs(55)) + vs(10),
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
      (StatusBar.currentHeight ?? vs(55)) + (isIOS ? vs(10) : vs(25)),
  },
  noInternet: {
    textAlign: 'center',
  },
});
