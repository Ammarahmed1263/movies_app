import {FlatList, View} from 'react-native';
import {useEffect, useState} from 'react';
import axios from 'axios';
import ENDPOINT from '../utils/Constants';
import {API_KEY} from '../utils/Constants';
import MovieCard from '../components/home/MovieCard';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

export default function MoviesListing({movies}) {
  // TODO: find way to fetch data according to category
  const [now_playing, setnow_playing] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.request(
          ENDPOINT.movies.now_playing + '?page=1',
          options
        );
        // console.log(now_playing.data);
        console.log(response.data.results);
        setnow_playing(response.data.results);
      } catch (e) {
        console.log('failed to retrieve movies', e);
      } finally {
        console.log('done here');
      }
    })();
  }, []);

  function renderItem({item}) {
    return (
      <View
        style={{
          flex: 1,
          marginVertical: 10,
          marginHorizontal: 5,
          alignItems: 'center',
          justifyContent: 'center',
          // backgroundColor: 'blue'
        }}>
        <MovieCard
          movie={item}
          style={{
            flex: 1,
            width: 165,
            height: 240,
            backgroundColor: 'white',
            marginHorizontal: 0
          }}
        />
      </View>
    );
  }

  return (
    <View style={{marginHorizontal: 10}}>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={movies || now_playing}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
