import AppButton from '@atoms/AppButton';
import AppImage from '@atoms/AppImage';
import AppText from '@atoms/AppText';
import MovieCardButton from '@atoms/MovieCardButton';
import {useTheme} from '@contexts/ThemeContext';
import {hs, ms, vs, width} from '@styles/metrics';
import {getImageUrl} from '@utils';
import {FC, useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, StatusBar, StyleSheet, View} from 'react-native';
import {MovieCategory} from 'types/categoryTypes';
import {Movie, Trailer} from 'types/movieTypes';
import {MovieListingNavigationProp} from 'types/mainStackTypes';
import {useNavigation} from '@react-navigation/native';
import MovieVideoCard from '@molecules/MovieVideoCard';
import YoutubeModal from './YoutubeModal';

type MovieVideoSectionProps = {
  data: Movie[];
  topic: string;
  category?: MovieCategory;
  time_window?: 'day' | 'week';
  seeAll?: boolean;
};

const MovieVideoSection: FC<MovieVideoSectionProps> = ({
  data,
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
                navigation.navigate('MovieListing', {category, time_window})
              }
              flat>
              {t('see_all')}
            </AppButton>
          )}
        </View>
        <FlatList
          data={data}
          renderItem={handleRenderItem}
          contentContainerStyle={styles.listContainer}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
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
    paddingHorizontal: hs(15),
    gap: hs(10),
    marginVertical: vs(10),
  },
});
