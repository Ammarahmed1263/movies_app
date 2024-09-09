import { SafeAreaView, StatusBar, View } from "react-native";
import MoviesList from "./MoviesList";
import SearchBar from "@molecules/SearchBar";
import { useEffect, useState } from "react";
import axios from "axios";

const options = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/search/movie',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MTVjMDE0NjIxZGNlNGNhNGYzMzI2NWQ2MzA5ZmZhMiIsIm5iZiI6MTcyMzk0NTAyOC41NTczNiwic3ViIjoiNjUyNjYwZmZmZDYzMDA1ZDdiMjcyNWJkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.TomwT7b8_CPHmRJbHxdkDcxg4lJ7r-E0NsICrSKt_y4'
  }
};

function SearchScreen() {
  const [keyword, setkeyword] = useState('');
  const [movies, setMovies] = useState([]);

  
  useEffect(() => {
    (async () => {
      axios
        .request({...options, params: { query: keyword, language: 'ar-EG'}}) //TODO: change based on app locale
        .then(function (response) {
          console.log(response.data);
          setMovies(response.data.results);
        })
        .catch(function (error) {
          console.error(error);
        });
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