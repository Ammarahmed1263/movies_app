import {FC, useEffect, useReducer} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import AppText from '@atoms/AppText';
import { useTheme } from '@contexts/ThemeContext';
import MoviesList from '@organisms/MoviesList';
import {getMoviesByCategory} from '@services/movieService';
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
  const {category, time_window} = route.params;
  const [state, dispatch] = useReducer(reducer, initialState);
  const { colors } = useTheme();

  useEffect(() => {
    (async () => {
      dispatch({type: 'RESET_SEARCH'});
      dispatch({type: 'SET_LOADING'});
      let response;
      if (category === 'trending') {
        if (time_window) {
          response = await getMoviesByCategory(category, { time_window: time_window });
        } else {
          console.log('no valid time window passed');
        }
      } else {
        response = await getMoviesByCategory(category);
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
    if (state.page < state.totalPages && !state.loading) {
      console.log('fetching page now');
      dispatch({type: 'SET_LOADING'});
      let response;
      if (category === 'trending') {
        if (time_window) {
          response = await getMoviesByCategory(category, { page: state.page + 1, time_window: time_window });
        } else {
          console.log('no valid time window passed');
        }
      } else {
        response = await getMoviesByCategory(category, { page: state.page + 1 });
      } 
      dispatch({type: 'FETCH_MOVIES', payload: response});
    }
  };

  return (
    <MoviesList
      data={state.movies}
      onEndReached={handlePagination}
      keyExtractor={(movie) => movie.id.toString() + category}
      numColumns={2}
      columnWrapperStyle={{justifyContent: 'flex-start'}}
      ListFooterComponent={
        state.loading ? (
          <View style={{alignItems: 'center', paddingBottom: 10}}>
            <ActivityIndicator color={colors.secondary500} size="large" />
          </View>
        ) : null
      }
    />
  );
};

export default MovieListingScreen;
