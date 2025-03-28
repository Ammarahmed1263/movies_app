import AppButton from '@atoms/AppButton';
import AppText from '@atoms/AppText';
import {useTheme} from '@contexts/ThemeContext';
import MovieCard from '@molecules/MovieCard';
import MovieListItem from '@molecules/MovieListItem';
import {hs, ms, vs} from '@styles/metrics';
import {FC, useState} from 'react';
import {
  FlatList,
  FlatListProps,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Movie, MovieArray, MovieSummary} from 'types/movieTypes';
import MoviesList from './MoviesList';
import AppLoading from '@atoms/AppLoading';
import useOrientation from '@hooks/useOrientation';

interface MovieViewToggleProps
  extends Omit<FlatListProps<MovieSummary>, 'data' | 'renderItem'> {
  movies: MovieArray;
  containerStyle?: ViewStyle;
  renderItem?: ({item}: {item: MovieSummary}) => JSX.Element;
}

const MovieViewToggle: FC<MovieViewToggleProps> = ({
  movies,
  containerStyle,
  renderItem,
  ...props
}) => {
  const [columns, setColumns] = useState(1);
  const {colors} = useTheme();
  const {isPortrait} = useOrientation();

  const handleRenderItem = ({item}: {item: MovieSummary}) => {
    return columns === 1 ? (
      <MovieListItem movie={item} />
    ) : (
      <MovieCard movie={item as Movie} />
    );
  };

  return (
    <View style={[{flex: 1}, containerStyle]}>
      <View style={styles.header}>
        <AppText variant="heading">Explore</AppText>
        {!renderItem && (
          <View style={styles.icons}>
            <AppButton onPress={() => setColumns(1)} customView flat>
              <Icon
                name={'pause'}
                size={ms(30)}
                color={columns === 1 ? colors.link : colors.paleShade}
                style={{transform: [{rotate: '90deg'}]}}
              />
            </AppButton>
            <AppButton onPress={() => setColumns(2)} customView flat>
              <Icon
                name={'grid'}
                size={ms(25)}
                color={columns === 2 ? colors.link : colors.paleShade}
              />
            </AppButton>
          </View>
        )}
      </View>

      <MoviesList
        data={movies as MovieSummary[]}
        renderItem={renderItem ? renderItem : handleRenderItem}
        numColumns={columns}
        key={columns}
        keyExtractor={movie => movie.id.toString()}
        {...(columns === 2 && {
          columnWrapperStyle: {
            justifyContent: 'flex-start',
            gap: isPortrait ? hs(12) : hs(20),
            marginBottom: vs(20),
            marginHorizontal: isPortrait ? hs(8) : hs(30),
          },
        })}
        contentContainerStyle={[
          styles.listContent,
          props.contentContainerStyle,
        ]}
        ListEmptyComponent={
          <AppLoading
            source={require('../../assets/lottie/loading_fade.json')}
            size={60}
            speed={1.8}
            containerStyle={styles.loadingContainer}
          />
        }
        snapStyle={{bottom: Platform.OS === 'ios' ? 80 : 120}}
        {...props}
      />
    </View>
  );
};

export default MovieViewToggle;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: hs(15),
    paddingVertical: vs(8),
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: hs(6),
  },
  listContent: {
    flex: 1,
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    minHeight: '80%',
  },
});
