import MoviesList from '@organisms/MoviesList';
import {getNowPlaying, getPopular, getTopRated, getUpcoming} from '@services/movieService';
import {useEffect, useReducer} from 'react';
import {Text, View} from 'react-native';

const initialState = {
  movies: [],
  loading: false,
  page: 1,
  totalPages: 1,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'RESET_SEARCH':
      return {
        ...state,
        movies: [],
        page: 1,
        totalPages: 1,
        loading: false,
      };
    case 'FETCH_MOVIES':
      return {
        ...state,
        movies: [...state.movies, ...action?.payload?.results],
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

const MoviesListingScreen = ({route}) => {
  const {category} = route.params;
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log('state here: ', state)
  useEffect(() => {
    (async () => {
      dispatch({type: 'RESET_SEARCH'});
      let response;
      switch (category) {
        case 'popular':
          response = await getPopular();
          break;
        case 'now playing':
          response = await getNowPlaying();
          break;
        case 'upcoming':
          response = await getUpcoming();
          break;
        case 'top rated':
          response = await getTopRated();
          break;
        default:
          response = [];
      }
      dispatch({type: 'FETCH_MOVIES', payload: response});
    })();
  }, []);

  if (state.movies.length === 0) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>loading...</Text>
      </View>
    );
  }

  const handlePagination = async () => {
    if (state.page < state.totalPages) {
      dispatch({type: 'SET_LOADING'});
      let response;
      switch (category) {
        case 'popular':
          response = await getPopular(state.page + 1);
          break;
        case 'now playing':
          response = await getNowPlaying(state.page + 1);
          break;
        case 'upcoming':
          response = await getUpcoming(state.page + 1);
          break;
        case 'top rated':
          response = await getTopRated(state.page + 1);
          break;
        default:
          response = [];
      }
      dispatch({type: 'FETCH_MOVIES', payload: response});
    }
  };

  return (
    <MoviesList
      movies={state.movies}
      onEndReached={handlePagination}
      isLoading={state.loading}
    />
  );
};

export default MoviesListingScreen;
