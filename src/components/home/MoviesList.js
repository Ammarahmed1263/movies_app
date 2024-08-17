import {FlatList, Text, View, StyleSheet} from 'react-native';
import Button from '../ui/Button';
import MovieCard from './MovieCard';
import { useTheme } from '../../context/ThemeContext';
;
import Heading from '../ui/Heading';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

const renderMovie = ({item}) => {
  return <MovieCard movie={item} />;
};

function MoviesList({movies, topic, seeAll, length = 10}) {
  const {colors, fonts} = useTheme();
  const navigation = useNavigation();
  const { t } = useTranslation();
  
  return (
    <View style={{...styles.container, backgroundColor: colors.primary500}}>
      <View style={styles.heading}>
        <Heading>{topic}</Heading>
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
        contentContainerStyle={{flexGrow: 1}}
        renderItem={renderMovie}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        horizontal
      />
    </View>
  );
}

export default MoviesList;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    marginBottom: -2
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    marginHorizontal: 14,
  },
  button: {
    fontSize: 18,
    textTransform: 'none',
  },
});
