import {FlatList, View} from 'react-native';
import {useEffect, useState} from 'react';
import ENDPOINT from '../../utils/Constants';
import {API_KEY} from '../../utils/Constants';
import axios from 'axios';
import FavoriteCard from './FavoriteCard';

const options = {
  method: 'GET',
  params: {language: 'en-US', page: '1'},
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

function renderFavorite({item}) {
  return <FavoriteCard movie={item} />;
}

function FavoritesList() {
  const [now_playing, setnow_playing] = useState([]);
  console.log(now_playing);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.request(
          ENDPOINT.movies.now_playing,
          options,
        );
        // console.log(now_playing.data);
        console.log(response.data.results);
        setnow_playing([...now_playing, ...response.data.results]);
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
        data={now_playing.slice(10, 30)}
        renderItem={renderFavorite}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

export default FavoritesList;
