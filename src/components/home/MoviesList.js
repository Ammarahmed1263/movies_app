import {FlatList, Text, View, StyleSheet} from 'react-native';
import Button from '../ui/Button';
import MovieCard from './MovieCard';
import {useTheme} from '../../store/context/ThemeContext';

const renderMovie = ({item}) => {
  return <MovieCard movie={item} />;
};

function MoviesList({movies, topic}) {
  const {colors, fonts} = useTheme();

  return (
    <View style={{...styles.container, backgroundColor: colors.primary500}}>
      <View style={styles.heading}>
        <Text
          style={{
            ...styles.topicTitle,
            fontFamily: fonts.bold,
            color: colors.paleShade,
          }}>
          {topic}
        </Text>
        <Button
          flat
          textStyle={{
            ...styles.button,
            color: colors.secondary500,
            fontFamily: fonts.light,
          }}>
          See all
        </Button>
      </View>
      <FlatList
        data={movies.slice(0, 10)}
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
  topicTitle: {
    fontSize: 27,
  },
  button: {
    fontSize: 18,
    textTransform: 'none',
  },
});
