import MoviesList from '@organisms/MoviesList';
import { useReducer } from 'react';

const MoviesListingScreen = ({route}) => {
  const {category, initMovies: movies} = route.params;
  const [state, dispatch] = useReducer(reducer, initialState)

  return <MoviesList movies={movies} onEndReached={() => console.log('end reached')}/>;
};

export default MoviesListingScreen;
