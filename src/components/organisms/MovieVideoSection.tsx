import AppButton from '@atoms/AppButton';
import AppLoading from '@atoms/AppLoading';
import AppText from '@atoms/AppText';
import MovieVideoCard from '@molecules/MovieVideoCard';
import {useNavigation} from '@react-navigation/native';
import {hs, vs} from '@styles/metrics';
import {FC, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, StatusBar, StyleSheet, View} from 'react-native';
import {MovieCategory} from 'types/categoryTypes';
import {MovieListingNavigationProp} from 'types/mainStackTypes';
import {Movie, Trailer} from 'types/movieTypes';
import YoutubeModal from './YoutubeModal';

type MovieVideoSectionProps = {
  movies: Movie[];
  loading?: boolean;
  topic: string;
  category?: MovieCategory;
  time_window?: 'day' | 'week';
  seeAll?: boolean;
};

const MovieVideoSection: FC<MovieVideoSectionProps> = ({
  movies,
  loading,
  topic,
  category = 'now_playing',
  time_window,
  seeAll = true,
}) => {
  const navigation = useNavigation<MovieListingNavigationProp>();
  const {t} = useTranslation();
  const [activeTrailers, setActiveTrailers] = useState<Trailer[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = (trailers: Trailer[]) => {
    setModalVisible(true);
    setActiveTrailers(trailers);
  };

  const handleRenderItem = ({item}: {item: Movie}) => {
    return <MovieVideoCard movie={item} onPress={handleOpenModal} />;
  };

  return (
    <>
      {modalVisible && <StatusBar backgroundColor="rgba(22, 21, 21, 0.8)" />}
      <View style={styles.container}>
        <View style={styles.header}>
          <AppText variant="heading">{topic}</AppText>
          {seeAll && (
            <AppButton
              variant="body"
              onPress={() =>
                navigation.navigate('MovieListing', {
                  type: 'category',
                  value: category,
                  time_window,
                })
              }
              flat>
              {t('see_all')}
            </AppButton>
          )}
        </View>
        {loading ? (
          <AppLoading
            source={require('../../assets/lottie/loading_fade.json')}
          />
        ) : (
          <FlatList
            data={movies}
            renderItem={handleRenderItem}
            ListEmptyComponent={
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <AppText variant="subheading">
                  {t('Sorry, no movies found')}
                </AppText>
              </View>
            }
            contentContainerStyle={styles.listContainer}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
        )}
      </View>

      <YoutubeModal
        videos={activeTrailers}
        visible={modalVisible}
        handleClose={() => setModalVisible(false)}
      />
    </>
  );
};

export default MovieVideoSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: vs(10),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginStart: hs(15),
    marginEnd: hs(10),
  },
  listContainer: {
    flexGrow: 1,
    paddingHorizontal: hs(15),
    gap: hs(10),
    marginVertical: vs(10),
  },
});
