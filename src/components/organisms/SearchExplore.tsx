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
import {MovieArray, MovieSummary} from 'types/movieTypes';
import {CastMember} from 'types/castTypes';

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
  const [actors, setActors] = useState<CastMember[]>([]);
  const [discover, setDiscover] = useState<MovieArray>([]);
  const [loading, setLoading] = useState(false);
  const {t} = useTranslation();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const [actors, actors2, movies] = await Promise.allSettled([
          getPopularPerson(),
          getPopularPerson({page: 2}),
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
                (person: CastMember) =>
                  person.gender === 2 && person.profile_path,
              ),
            ),
          'failed to fetch popular actors',
        );

        handlePromiseResult(
          actors2,
          response =>
            setActors(prevActors => [
              ...prevActors,
              ...response.results.filter(
                (person: CastMember) =>
                  person.gender === 2 && person.profile_path,
              ),
            ]),
          'failed to fetch popular actors',
        );

        handlePromiseResult(
          movies,
          response => setDiscover(response.results),
          'failed to fetch popular actors',
        );
      } catch (err: any) {
        console.log("sorry can't get actors: ", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <View style={[styles.container, style]}>
      {!renderMovie && (
        <CastList cast={actors} title={t('actors')} loading={loading} />
      )}
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
