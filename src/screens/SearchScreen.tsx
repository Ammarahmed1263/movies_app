import { SafeAreaView, StatusBar, View } from "react-native";
import MoviesList from "./MoviesList";
import SearchBar from "@molecules/SearchBar";
import { useEffect, useState } from "react";
import { searchMovies } from "@services/movieService";


function SearchScreen() {
  const [keyword, setkeyword] = useState('');
  const [movies, setMovies] = useState([]);

  
  useEffect(() => {
    (async () => {
      const response = await searchMovies({query: keyword})
      setMovies(response.results)
    })()
  }, [keyword])

  return (
    <SafeAreaView style={{flex: 1, marginTop: StatusBar.currentHeight}}>
      <SearchBar keyword={keyword} setKeyword={setkeyword}/>
      <MoviesList movies={movies}/> 
    </SafeAreaView>
  )
}

export default SearchScreen;