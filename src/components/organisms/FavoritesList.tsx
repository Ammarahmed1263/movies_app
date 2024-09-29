import {FlatList, View} from 'react-native';
import {FC, useEffect, useState} from 'react';
import FavoriteCard from '@molecules/FavoriteCard';
import { getNowPlaying } from '@services/movieService';
import { Movie, MovieArray } from 'types/movieTypes';
import AppText from '@atoms/AppText';
import AppButton from '@atoms/AppButton';
import { useNavigation } from '@react-navigation/native';
import { HomeNavigationProp } from 'types/mainTabsTypes';
import { vs } from '@styles/metrics';

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
        ListEmptyComponent={<View>
          <AppText>no favorites</AppText>
          <AppText>you can add add an item to your favorites by clicking "heart icon"</AppText>
          <AppButton onPress={() => navigation.navigate("Home")}>start adding</AppButton>
        </View>}
      />
    </View>
  );
}

export default FavoritesList;
