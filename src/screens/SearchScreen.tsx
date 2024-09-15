import {SafeAreaView, StatusBar} from 'react-native';
import MoviesList from '../components/organisms/MoviesList';
import SearchBar from '@molecules/SearchBar';
import {useCallback, useEffect, useReducer, useState} from 'react';
import {searchMovies} from '@services/movieService';

const initialState = {
  searchResults: [],
  loading: false,
  page: 1,
  totalPages: 1,
};


const reducer = (state, action) => {
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
          movies={state.searchResults}
          onEndReached={handlePagination}
          isLoading={state.page < state.totalPages}
        />
      ) : null}
    </SafeAreaView>
  );
}

export default SearchScreen;
