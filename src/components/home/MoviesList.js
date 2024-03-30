import {FlatList, Text, View, StyleSheet} from 'react-native';
import Button from '../ui/Button';
import GlobalStyles from '../../styles/GlobalStyles';
import MovieCard from './MovieCard';

const renderMovie = ({item}) => {
  return <MovieCard movie={item}/>;
};

function MoviesList({movies, topic}) {

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.topicTitle}>{topic}</Text>
        <Button flat textStyle={styles.button}>See all</Button>
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
    marginBottom: 20
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
    fontFamily: GlobalStyles.fontBold,
    color: GlobalStyles.paleWhite,
  },
  button: {
    fontSize: 18,
    textTransform: 'none',
    color: GlobalStyles.secondary500,
    fontFamily: GlobalStyles.fontLight
  },
});
