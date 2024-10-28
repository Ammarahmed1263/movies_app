import {SafeAreaView, StatusBar, View} from 'react-native';
import MoviesList from '../components/organisms/MoviesList';
import SearchBar from '@molecules/SearchBar';
import {useState} from 'react';
import LottieView from 'lottie-react-native';
import {vs, width} from '@styles/metrics';
import AppLoading from '@atoms/AppLoading';
import AppText from '@atoms/AppText';
import useMovieSearch from '@hooks/useMovieSearch';


function SearchScreen() {
  const [keyword, setkeyword] = useState('');
  const {results, page, total_pages, handlePagination, loading} = useMovieSearch(keyword);


  return (
    <SafeAreaView style={{flex: 1, marginTop: StatusBar.currentHeight}}>
      <SearchBar keyword={keyword} setKeyword={setkeyword} />
      {loading && results.length === 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <AppLoading source={require('../assets/lottie/loading_fade.json')} size={70} speed={1.8}/>
        </View>
      ) : (
        <View style={{flex: 1}}>
          {keyword ? (
            <MoviesList
              data={results}
              onEndReached={handlePagination}
              columnWrapperStyle={{justifyContent: 'flex-start'}}
              numColumns={2}
              contentContainerStyle={{paddingBottom: vs(80)}}
              snapStyle={{bottom: vs(100)}}
              ListEmptyComponent={
                keyword && results.length === 0 ? (
                  <View
                    style={{
                      alignItems: 'center',
                      paddingHorizontal: 30,
                    }}>
                    <LottieView
                      source={require('../assets/lottie/no_search_results(2).json')}
                      style={{width: width * 0.8, aspectRatio: 1 / 1}}
                      autoPlay
                      loop
                    />
                    <AppText variant="heading" style={{textAlign: 'center'}}>
                      Ooops...No movie found with {keyword}!
                    </AppText>
                  </View>
                ) : null
              }
              ListFooterComponent={
                page < total_pages &&
                results.length !== 0 ? (
                  <View style={{alignItems: 'center', paddingBottom: vs(20)}}>
                    <AppLoading
                      size={35}
                      speed={2.5}
                      source={require('../assets/lottie/loading_fade.json')}
                    />
                  </View>
                ) : null
              }
            />
          ) : (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <AppText variant="heading">search here</AppText>
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

export default SearchScreen;
