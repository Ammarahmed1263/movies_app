import {ActivityIndicator, FlatList, Keyboard, View} from 'react-native';
import {FC} from 'react';
import MovieCard from '@molecules/MovieCard';
import {Movie, MovieArray} from 'types/movieTypes';
import {useTheme} from '@contexts/ThemeContext';

interface MoviesListProps {
  movies: MovieArray;
  onEndReached: () => void;
  isLoading: boolean;
}

const MoviesList: FC<MoviesListProps> = ({movies, onEndReached, isLoading}) => {
  const {colors} = useTheme();

  function renderItem({item}: {item: Movie}) {
    return (
      <MovieCard
        movie={item}
        style={{
          margin: 10,
        }}
      />
    );
  }

  return (
    <View style={{flex: 1, marginHorizontal: 10}}>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 15}}
        columnWrapperStyle={{justifyContent: 'flex-start'}}
        numColumns={2}
        data={movies}
        renderItem={renderItem}
        onScrollBeginDrag={() => Keyboard.dismiss()}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.4}
        ListFooterComponent={
          isLoading ? (
            <View style={{alignItems: 'center', marginTop: 4}}>
              <ActivityIndicator color={colors.secondary500} size="large" />
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default MoviesList;
