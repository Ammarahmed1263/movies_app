import AppText from '@atoms/AppText';
import React, {FC, useEffect, useState} from 'react';
import {
  I18nManager,
  Platform,
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import CastList from './CastList';
import {vs} from '@styles/metrics';
import axios from 'axios';
import apiClient from 'api/apiClient';
import {useTranslation} from 'react-i18next';
import MovieViewToggle from './MovieViewToggle';
import {discoverMovies} from '@services/movieService';
import {getPopularPerson} from '@services/castMemberService';
import {handlePromiseResult} from '@utils';
import {MovieSummary} from 'types/movieTypes';

type SearchExploreProps = {
  renderMovie?: ({item}: {item: MovieSummary}) => JSX.Element;
  style?: ViewStyle;
  listContainerStyle?: StyleProp<ViewStyle>;
};

const SearchExplore: FC<SearchExploreProps> = ({
  style,
  listContainerStyle,
  renderMovie,
}) => {
  const [actors, setActors] = useState([]);
  const [discover, setDiscover] = useState([]);
  const {t} = useTranslation();

  useEffect(() => {
    (async () => {
      try {
        const [actors, movies] = await Promise.allSettled([
          getPopularPerson(),
          discoverMovies({
            sort_by: 'popularity.desc',
            primary_release_year: new Date().getFullYear(),
            'vote_average.lte': 9,
            'vote_average.gte': 5,
          }),
        ]);

        handlePromiseResult(
          actors,
          response =>
            setActors(
              response.results.filter(
                (person: any) => person.gender === 2 && person.profile_path,
              ),
            ),
          'failed to fetch popular actors',
        );

        handlePromiseResult(
          movies,
          response => setDiscover(response.results),
          'failed to fetch popular actors',
        );
      } catch (err: any) {
        console.log("sorry can't get actors: ", err);
      }
    })();
  }, []);

  return (
    <View style={[styles.container, style]}>
      {!renderMovie && <CastList cast={actors} title={t('actors')} />}
      <MovieViewToggle
        movies={discover}
        contentContainerStyle={listContainerStyle}
        renderItem={renderMovie}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
};

export default SearchExplore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: vs(15),
  },
});
