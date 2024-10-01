import AppText from '@atoms/AppText';
import MoviesList from '@organisms/MoviesList';
import {getNowPlaying, getPopular, getTopRated, getUpcoming} from '@services/movieService';
import {FC, useEffect, useReducer} from 'react';
import {Text, View} from 'react-native';
import { MovieListingScreenProps } from 'types/mainStackTypes';

const initialState = {
  movies: [],
  loading: false,
  page: 1,
  totalPages: 1,
};

const reducer = (state: any, action: any) => {
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

const MovieListingScreen: FC<MovieListingScreenProps> = ({route}) => {
  const {category} = route.params;
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log('state here: ', state)
  // TODO: refactor to specific service
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
        <AppText variant='heading'>loading...</AppText>
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
      data={state.movies}
      onEndReached={handlePagination}
      isLoading={state.loading}
    />
  );
};

export default MovieListingScreen;
