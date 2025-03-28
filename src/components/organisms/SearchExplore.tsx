import useOrientation from '@hooks/useOrientation';
import {getPopularPerson} from '@services/castMemberService';
import {discoverMovies} from '@services/movieService';
import {hs, vs} from '@styles/metrics';
import {handlePromiseResult} from '@utils';
import {FC, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {CastMember} from 'types/castTypes';
import {MovieArray, MovieSummary} from 'types/movieTypes';
import CastList from './CastList';
import MovieViewToggle from './MovieViewToggle';

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
  const {orientation} = useOrientation();

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
    <View
      style={[
        styles.container,
        {flexDirection: orientation === 'portrait' ? 'column' : 'row'},
        style,
      ]}>
      {!renderMovie && (
        <View style={{width: orientation === 'portrait' ? '100%' : '30%'}}>
          <CastList
            cast={actors}
            title={t('actors')}
            loading={loading}
            numColumns={orientation === 'portrait' ? 1 : 2}
            key={orientation}
            horizontal={orientation === 'portrait'}
            {...(orientation !== 'portrait' && {
              showsVerticalScrollIndicator: false,
              columnWrapperStyle: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: hs(10),
              },
              viewStyle: {
                marginBottom: vs(100),
              },
            })}
          />
        </View>
      )}
      <MovieViewToggle
        movies={discover}
        contentContainerStyle={[{paddingTop: vs(10)}, listContainerStyle]}
        renderItem={renderMovie}
        keyboardShouldPersistTaps="handled"
        containerStyle={{
          width: orientation === 'portrait' || renderMovie ? '100%' : '70%',
        }}
      />
    </View>
  );
};

export default SearchExplore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
