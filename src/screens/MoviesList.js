import {FlatList, View} from 'react-native';
import {useEffect, useState} from 'react';
import MovieCard from '../components/molecules/MovieCard';
import { getNowPlaying } from '../api/services/movieService';



export default function MoviesList({movies}) {
  // TODO: find way to fetch data according to category
  const [now_playing, setnow_playing] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getNowPlaying();
        // console.log(now_playing.data);
        console.log(response.results);
        setnow_playing(response.results);
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
          marginVertical: 10,
          marginHorizontal: 10,
        }}>
        <MovieCard
          movie={item}
          style={{
            flex: 1,
            width: 175,
            height: 250,
            backgroundColor: 'white',
            marginHorizontal: 0
          }}
        />
      </View>
    );
  }

  return (
    <View style={{flex: 1, marginHorizontal: 10}}>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{alignItems: 'center', paddingBottom: 15}}
        numColumns={2}
        data={movies || now_playing}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}