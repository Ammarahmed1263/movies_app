import {ActivityIndicator, SafeAreaView, StatusBar, View} from 'react-native';
import MoviesList from '../components/organisms/MoviesList';
import SearchBar from '@molecules/SearchBar';
import {useCallback, useEffect, useReducer, useState} from 'react';
import {searchMovies} from '@services/movieService';
import { SearchResult } from 'types/searchTypes';
import { useTheme } from '@contexts/ThemeContext';


const initialState: SearchResult = {
  searchResults: [],
  loading: false,
  page: 1,
  totalPages: 1,
};

const reducer = (state: SearchResult, action: any) => {
  switch (action.type) {
    case 'RESET_SEARCH':
      return {
        ...state,
        searchResults: [],
        page: 1,
        totalPages: 1,
        loading: false,
      };
    case 'SET_RESULTS':
      // console.log('fetch here 2: ', state, action.paylaod);
      return {
        ...state,
        searchResults: [...state.searchResults, ...action?.payload?.results],
        page: action?.payload?.page,
        totalPages: action?.payload?.total_pages,
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
  const { colors } = useTheme();
  console.log('state here', state, keyword);

  const handleSearch = useCallback(async () => {
    console.log('search key now: ', keyword);
    dispatch({type: 'SET_LOADING'});
    // if (keyword === '') {
      dispatch({type: 'RESET_SEARCH'});
      // return;
    // }
    const response = await searchMovies({query: keyword, page: state.page});
    dispatch({type: 'SET_RESULTS', payload: response});
    console.log('search response here: ', state);
  }, [keyword]);

  useEffect(() => {
    const id = setTimeout(() => handleSearch(), 500);

    return () => clearTimeout(id);
  }, [keyword]);

  const handlePagination = async () => {
    if (state.page < state.totalPages) {
      dispatch({type: 'SET_LOADING'});
      const response = await searchMovies({
        query: keyword,
        page: state.page + 1,
      });
      console.log('api responded: ', response);
      dispatch({type: 'SET_RESULTS', payload: response});
    }
  };

  return (
    <SafeAreaView style={{flex: 1, marginTop: StatusBar.currentHeight}}>
      <SearchBar keyword={keyword} setKeyword={setkeyword} />
      {state.searchResults.length ? (
        <MoviesList
          data={state.searchResults}
          onEndReached={handlePagination}
          columnWrapperStyle={{justifyContent: 'flex-start'}}
          numColumns={2}
          ListFooterComponent={
            state.loading ? (
              <View style={{alignItems: 'center', marginTop: 4, paddingVertical: 10}}>
                <ActivityIndicator color={colors.secondary500} size="large" />
              </View>
            ) : null
          }
        />
      ) : null}
    </SafeAreaView>
  );
}

export default SearchScreen;
