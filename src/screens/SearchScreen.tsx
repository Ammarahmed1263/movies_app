import {ActivityIndicator, SafeAreaView, StatusBar, View} from 'react-native';
import MoviesList from '../components/organisms/MoviesList';
import SearchBar from '@molecules/SearchBar';
import {useCallback, useEffect, useReducer, useState} from 'react';
import {searchMovies} from '@services/movieService';
import {SearchResult} from 'types/searchTypes';
import {useTheme} from '@contexts/ThemeContext';
import LottieView from 'lottie-react-native';
import {height, vs, width} from '@styles/metrics';
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
  const [isTyping, setIsTyping] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSearch = useCallback(async () => {
    dispatch({type: 'SET_LOADING'});
    dispatch({type: 'RESET_SEARCH'});
    const response = await searchMovies({query: keyword, page: state.page});
    dispatch({type: 'SET_RESULTS', payload: response});
  }, [keyword]);

  useEffect(() => {
    if (keyword === '') {
      dispatch({type: 'RESET_SEARCH'});
      return;
    }
    setIsTyping(true);
    const id = setTimeout(() => {handleSearch(); setIsTyping(false)}, 500);

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
        {!state.loading && !keyword && 
            <AppText variant='heading'>search here</AppText>
        }
        <MoviesList
          data={state.searchResults}
          onEndReached={handlePagination}
          columnWrapperStyle={{justifyContent: 'flex-start'}}
          numColumns={2}
          ListEmptyComponent={<View
            style={{
              alignItems: 'center',
              paddingHorizontal: 30,
            }}>
            <LottieView
              source={require('../assets/lottie/no_search_results.json')}
              style={{width: width * 0.8, aspectRatio: 1 / 1}}
              autoPlay
              loop
            />
            <AppText variant="heading" style={{textAlign: 'center'}}>
              Ooops...No movie found with this keyword: "{keyword}"
            </AppText>
          </View>}
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
    </SafeAreaView>
  );
}

export default SearchScreen;
