import {FlatList, Text, View, StyleSheet} from 'react-native';
import Button from '../atoms/AppButton/AppButton';
import MovieCard from '../molecules/MovieCard';
import { useTheme } from '../../context/ThemeContext';
import AppHeading from '../atoms/AppHeadingText/AppHeading';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

const renderMovie = ({item}) => {
  return <MovieCard movie={item} />;
};

function MoviesSection({movies, topic, seeAll, length = 10}) {
  const {colors, fonts} = useTheme();
  const navigation = useNavigation();
  const { t } = useTranslation();
  
  return (
    <View style={{...styles.container, backgroundColor: colors.primary500}}>
      <View style={styles.heading}>
        <AppHeading>{topic}</AppHeading>
        {seeAll && <Button
          textStyle={{
            ...styles.button,
            color: colors.secondary500,
            fontFamily: fonts.light,
          }}
          onPress={() => navigation.navigate('seeAllMovies')}
          flat>
          {t('see all')}
        </Button>}
      </View>
      <FlatList
        data={movies.slice(0, length)}
        contentContainerStyle={{flexGrow: 1, gap: 15, paddingHorizontal: 20}}
        renderItem={renderMovie}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        horizontal
      />
    </View>
  );
}

export default MoviesSection;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    marginStart: 20,
    marginEnd: 8
  },
  button: {
    fontSize: 18,
    textTransform: 'none',
  },
});