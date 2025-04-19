import {getMovieCredits, getMovieDetails} from '@services/movieDetailsService';
import {getMovieVideos, getSimilarMovies} from '@services/movieService';
import {handlePromiseResult} from '@utils';
import {useEffect, useState} from 'react';
import {Movie, MovieDetails, Trailer} from 'types/movieTypes';
import useFavoriteMovies from './useFavoriteMovies';

const useMovieDetails = (movieId: number) => {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | undefined>(
    undefined,
  );
  const [castMembers, setCastMembers] = useState([]);
  const [videos, setVideos] = useState<Trailer[]>([]);
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const {isFavoriteMovie, toggleFavoriteMovie} = useFavoriteMovies();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const [
          detailsResponse,
          creditsResponse,
          videosResponse,
          similarResponse,
        ] = await Promise.allSettled([
          getMovieDetails(movieId),
          getMovieCredits(movieId),
          getMovieVideos(movieId),
          getSimilarMovies(movieId),
        ]);

        handlePromiseResult(
          detailsResponse,
          setMovieDetails,
          'failed to fetch movie details',
        );

        handlePromiseResult(
          creditsResponse,
          data => setCastMembers(data.cast),
          'failed to fetch movie cast members',
        );

        handlePromiseResult(
          detailsResponse,
          setMovieDetails,
          'failed to fetch movie details',
        );

        handlePromiseResult(
          videosResponse,
          data => {
            setVideos(data.results);
          },
          'failed to fetch movie trailers',
        );

        handlePromiseResult(
          similarResponse,
          data => setSimilarMovies(data.results),
          'failed to fetch similar movies',
        );
      } catch (err) {
        console.log('failed to fetch details', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, []);

  return {
    movieDetails,
    castMembers,
    isFavoriteMovie: isFavoriteMovie(movieId),
    toggleFavoriteMovie,
    videos,
    similarMovies,
    loading,
  };
};

export default useMovieDetails;
