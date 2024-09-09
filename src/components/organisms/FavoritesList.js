import {FlatList, View} from 'react-native';
import {useEffect, useState} from 'react';
import FavoriteCard from '@molecules/FavoriteCard';
import { getNowPlaying } from '@services/movieService';

function renderFavorite({item}) {
  return <FavoriteCard movie={item} />;
}

function FavoritesList() {
  const [now_playing, setnow_playing] = useState([]);
  console.log(now_playing);

  useEffect(() => {
    (async () => {
      try {
        const response = await getNowPlaying();
        // console.log(now_playing.data);
        // console.log(response.data.results);
        setnow_playing([...now_playing, ...response.results]);
      } catch (e) {
        console.log('failed to retrieve movies', e);
      } finally {
        console.log('done favorites');
      }
    })();
  }, []);

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={now_playing.slice(1, 10)}
        renderItem={renderFavorite}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

export default FavoritesList;
