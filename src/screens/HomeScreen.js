import {useEffect, useState} from 'react';
import {Image, ScrollView, View} from 'react-native';
import axios from 'axios';
import MoviesList from '../components/home/MoviesList';
import ENDPOINT from '../utils/Constants';
import { API_KEY } from '../utils/Constants';

const options = {
  method: 'GET',
  params: {language: 'en-US', page: '1'},
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

function HomeScreen() {
  /*required data from response:
      1- title
      2- backdrop and poster path
      3- genre_ids
      4- id
      5- overview
      6- vote average
    */
  const [now_playing, setnow_playing] = useState([]);
  const [popular, setpopular] = useState([]);
  const [top_rated, settop_rated] = useState([]);
  const [upcoming, setupcoming] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.request(
          ENDPOINT.movies.now_playing,
          options,
        );
        // console.log(now_playing.data);
        console.log(response.data.results);
        setnow_playing([...now_playing, ...response.data.results])

        
        const response2 = await axios.request(
          ENDPOINT.movies.popular,
          options,
        );
        // console.log(now_playing.data);
        setpopular([...popular, ...response2.data.results])

        const response3 = await axios.request(
          ENDPOINT.movies.top_rated,
          options,
        );
        // console.log(now_playing.data);
        settop_rated([...top_rated, ...response3.data.results])

        const response4 = await axios.request(
          ENDPOINT.movies.upcoming,
          options,
        );
        // console.log(now_playing.data);
        setupcoming([...upcoming, ...response4.data.results])


      } catch (e) {
        console.log('failed to retrieve movies', e);
      } finally {
        console.log('done here');
      }
    })();
  }, []);

  return (
    <View style={{flex: 1, padding: 5}}>
      
        <View style={{flex: 1}}>

        </View>
        <View style={{flex: 1.3}}>
          <ScrollView>
            <MoviesList movies={now_playing} topic='Now Playing' />
            <MoviesList movies={top_rated} topic='Top Rated' />
            <MoviesList movies={upcoming} topic='UpComing' />
            <MoviesList movies={popular} topic='Popular' />
          </ScrollView>
        </View>
    </View>
  );
}

export default HomeScreen;
