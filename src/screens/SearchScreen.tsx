import {Platform, SafeAreaView, StatusBar, TextInput, View} from 'react-native';
import MoviesList from '../components/organisms/MoviesList';
import SearchBar from '@molecules/SearchBar';
import {useCallback, useEffect, useReducer, useState} from 'react';
import {searchMovies} from '@services/movieService';
import {SearchResult} from 'types/searchTypes';
import LottieView from 'lottie-react-native';
import {hs, vs, width} from '@styles/metrics';
import AppLoading from '@atoms/AppLoading';
import AppText from '@atoms/AppText';

const initialState: SearchResult = {
  searchResults: [],
  loading: false,
  page: 1,
  total_pages: 1,
};

const reducer = (state: SearchResult, action: any) => {
  switch (action.type) {
    case 'RESET_SEARCH':
      return {
        ...state,
        searchResults: [],
        page: 1,
        total_pages: 1,
      };
    case 'SET_RESULTS':
      return {
        ...state,
        searchResults: [...state.searchResults, ...action?.payload?.results],
        page: action?.payload?.page,
        total_pages: action?.payload?.total_pages,
        loading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'STOP_LOADING':
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

function SearchScreen() {
  const [keyword, setkeyword] = useState('');
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSearch = useCallback(async () => {
    // dispatch({type: 'SET_LOADING'});
    dispatch({type: 'RESET_SEARCH'});
    const response = await searchMovies({query: keyword, page: state.page});
    dispatch({type: 'SET_RESULTS', payload: response});
  }, [keyword]);

  useEffect(() => {
    if (keyword === '') {
      dispatch({type: 'RESET_SEARCH'});
      dispatch({type: 'STOP_LOADING'});
      return;
    }

    dispatch({type: 'SET_LOADING'});
    const id = setTimeout(() => handleSearch(), 500);
    // dispatch({type: 'STOP_LOADING'});
    return () => clearTimeout(id);
  }, [keyword]);

  const handlePagination = async () => {
    if (state.page < state.total_pages && !state.loading) {
      dispatch({type: 'SET_LOADING'});
      const response = await searchMovies({
        query: keyword,
        page: state.page + 1,
      });
      dispatch({type: 'SET_RESULTS', payload: response});
    }
  };

  return (
    <SafeAreaView style={{flex: 1, marginTop: StatusBar.currentHeight}}>
      <SearchBar keyword={keyword} setKeyword={setkeyword} />
      {state.loading && state.searchResults.length === 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <AppLoading source={require('../assets/lottie/loading_fade.json')} size={70} speed={1.8}/>
        </View>
      ) : (
        <View style={{flex: 1}}>
          {keyword ? (
            <MoviesList
              data={state.searchResults}
              onEndReached={handlePagination}
              columnWrapperStyle={{justifyContent: 'flex-start', gap: hs(10), marginVertical: vs(12)}}
              contentContainerStyle={{flexGrow: 1, paddingBottom: vs(80), marginHorizontal: hs(10)}}
              numColumns={2}
              snapStyle={{bottom: vs(100)}}
              ListEmptyComponent={
                keyword && state.searchResults.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingHorizontal: 30,
                      marginBottom: 100
                    }}>
                    <LottieView
                      source={Platform.OS === 'ios' ? require('../assets/lottie/no_search_results(2).json') : require('../assets/lottie/no_search_results.json')}
                      style={{width: Platform.OS === 'ios' ? width * 0.7 : width * 0.8, aspectRatio: 1 / 1}}
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
                state.page < state.total_pages &&
                state.searchResults.length !== 0 ? (
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
