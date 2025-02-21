import {getMovieCredits, getMovieDetails} from '@services/movieDetailsService';
import {getMovieVideos, getSimilarMovies} from '@services/movieService';
import {isFavoriteMovie} from '@services/userService';
import {handlePromiseResult} from '@utils';
import {useEffect, useState} from 'react';
import {Movie, MovieDetails, Trailer} from 'types/movieTypes';

const useMovieDetails = (movieId: number) => {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | undefined>(
    undefined,
  );
  const [castMembers, setCastMembers] = useState([]);
  const [videos, setVideos] = useState<Trailer[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
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
      }
    };

    const checkFavorite = async () => {
      const favorite = await isFavoriteMovie(movieId);
      setIsFavorite(favorite);
    };

    fetchMovieDetails();
    checkFavorite();
  }, []);

  return {
    movieDetails,
    castMembers,
    isFavorite,
    setIsFavorite,
    videos,
    similarMovies,
  };
};

export default useMovieDetails;
