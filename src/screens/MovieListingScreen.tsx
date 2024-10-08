import AppText from '@atoms/AppText';
import { useTheme } from '@contexts/ThemeContext';
import MoviesList from '@organisms/MoviesList';
import {getNowPlaying, getPopular, getTopRated, getTrending, getUpcoming} from '@services/movieService';
import {FC, useEffect, useReducer} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
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
  const { colors } = useTheme();

  console.log('category here', category)
  // TODO: refactor to specific service
  useEffect(() => {
    (async () => {
      dispatch({type: 'RESET_SEARCH'});
      let response;
      switch (category) {
        case 'popular':
          response = await getPopular();
          break;
        case 'now_playing':
          response = await getNowPlaying();
          break;
        case 'upcoming':
          response = await getUpcoming();
          break;
        case 'top_rated':
          response = await getTopRated();
          break;
        case 'trending':
          response = await getTrending('day')
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
        case 'now_playing':
          response = await getNowPlaying(state.page + 1);
          break;
        case 'upcoming':
          response = await getUpcoming(state.page + 1);
          break;
        case 'top_rated':
          response = await getTopRated(state.page + 1);
          break;
        case 'trending':
          response = await getTrending('day', state.page + 1)
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
      numColumns={2}
      columnWrapperStyle={{justifyContent: 'flex-start'}}
      ListFooterComponent={
        state.loading ? (
          <View style={{alignItems: 'center', marginTop: 4, paddingVertical: 10}}>
            <ActivityIndicator color={colors.secondary500} size="large" />
          </View>
        ) : null
      }
    />
  );
};

export default MovieListingScreen;
