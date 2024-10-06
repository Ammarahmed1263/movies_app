export default function removeDuplicateMovies(movies: any[]) {
  const uniqueMovies = movies.reduce((acc: any[], movie: any) => {
    if (!acc.find((item) => item.id === movie.id)) {
      acc.push(movie);
    }
    return acc;
  }, []);
  return uniqueMovies;
};