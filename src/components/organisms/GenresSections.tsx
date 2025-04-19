import AppLoading from '@atoms/AppLoading';
import AppText from '@atoms/AppText';
import {useTheme} from '@contexts/ThemeContext';
import {useNavigation} from '@react-navigation/native';
import {getGenres} from '@services/genresService';
import {hs, vs} from '@styles/metrics';
import {FC, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {MainTabsNavigationProp} from 'types/mainStackTypes';

interface Genre {
  id: number;
  name: string;
}

interface Props {
  refreshing: boolean;
}

const GenresSections: FC<Props> = ({refreshing}) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const {colors} = useTheme();
  const {t} = useTranslation();
  const navigation = useNavigation<MainTabsNavigationProp>();

  const handleGenrePress = async (item: Genre) => {
    try {
      navigation.navigate('MovieListing', {
        type: 'genre',
        value: String(item.id),
        title: item.name,
      });
    } catch (error: any) {
      console.error('error fetching genre data: ', error.response.msg);
    }
  };

  const renderGenres = (genres: Genre[]) => {
    return genres.map(item => (
      <TouchableOpacity
        key={item.id}
        onPress={() => handleGenrePress(item)}
        style={[
          styles.genre,
          {
            borderColor: colors.secondary500,
          },
        ]}>
        <AppText variant="subheading">{item.name}</AppText>
      </TouchableOpacity>
    ));
  };

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const {genres} = await getGenres();
        setGenres(genres.filter((genre: Genre) => genre.name !== 'Romance'));
      } catch (error) {
        console.error('error fetching genres');
      }
    };

    if (genres.length === 0 || refreshing) {
      fetchGenres();
    }
  }, [refreshing]);

  return (
    <View style={styles.container}>
      <AppText variant="heading" style={styles.title}>
        {t('genres')}
      </AppText>
      {refreshing ? (
        <AppLoading source={require('../../assets/lottie/loading_fade.json')} />
      ) : (
        <View style={styles.rowsContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.row}>
            {renderGenres(genres.slice(0, Math.floor(genres.length / 2)))}
          </ScrollView>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentOffset={{x: hs(25), y: 0}}
            contentContainerStyle={styles.row}>
            {renderGenres(genres.slice(Math.floor(genres.length / 2)))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default GenresSections;

const styles = StyleSheet.create({
  container: {
    paddingVertical: vs(10),
  },
  title: {
    paddingHorizontal: hs(15),
  },
  rowsContainer: {
    gap: vs(10),
    marginTop: vs(15),
  },
  row: {
    paddingHorizontal: hs(15),
  },
  genre: {
    marginRight: hs(10),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: hs(20),
    paddingVertical: vs(15),
    borderRadius: hs(6),
    borderWidth: hs(2),
    minWidth: hs(100),
    flex: 1,
  },
});
