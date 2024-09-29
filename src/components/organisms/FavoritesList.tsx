import {FlatList, View} from 'react-native';
import {FC, useEffect, useState} from 'react';
import FavoriteCard from '@molecules/FavoriteCard';
import {getNowPlaying} from '@services/movieService';
import {Movie, MovieArray} from 'types/movieTypes';
import AppText from '@atoms/AppText';
import AppButton from '@atoms/AppButton';
import {useNavigation} from '@react-navigation/native';
import {HomeNavigationProp} from 'types/mainTabsTypes';
import {hs, vs, width} from '@styles/metrics';
import AppImage from '@atoms/AppImage';

function renderFavorite({item}: {item: Movie}) {
  return <FavoriteCard movie={item} />;
}

interface FavoritesListProps {
  movies: MovieArray;
}

const FavoritesList: FC<FavoritesListProps> = ({movies}) => {
  const navigation = useNavigation<HomeNavigationProp>();

  return (
    <View style={{flexGrow: 1, marginTop: vs(20)}}>
      <FlatList
        data={movies}
        renderItem={renderFavorite}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: hs(15)
            }}>
            <AppImage uri={require('../../assets/images/no-favorites.png')} viewStyle={{width: width * 0.5, aspectRatio: 1 / 1}}/>
            <AppText variant='heading'>No Favorites</AppText>
            <AppText style={{textAlign: 'center', marginBottom: vs(8)}}>
              You can favorite a movie by clicking on the heart that shows up when you view movie details (top right).
            </AppText>
            <AppButton onPress={() => navigation.navigate('Home')} style={{height: 50, width: '50%'}}>
              Find Favorites
            </AppButton>
          </View>
        }
      />
    </View>
  );
};

export default FavoritesList;
