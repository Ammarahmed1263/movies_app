import AppButton from '@atoms/AppButton';
import { useTheme } from '@contexts/ThemeContext';
import useLists from '@hooks/useLists';
import MovieListItem from '@molecules/MovieListItem';
import SearchBar from '@molecules/SearchBar';
import { height, hs, vs } from '@styles/metrics';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ActionSheet, { FlatList, SheetProps } from 'react-native-actions-sheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Movie } from 'types/movieTypes';

const AddToListSheet = (props: SheetProps<'add-to-list'>) => {
  const {colors} = useTheme();
  const [search, setSearch] = useState('');
  const {lists} = useLists();
  const [disableGesture, setDisableGesture] = useState(false);
  console.log('this is movies list', lists.slice(1));

  const renderItem = ({item, index}: {item: Movie; index: number}) => {
    return (
      <MovieListItem movie={item} key={index + item.id}>
        <AppButton
          customViewStyle={styles.addIcon}
          style={{marginStart: hs(5)}}
          onPress={() => {}}
          customView
          flat>
          <Icon
            name={item.isFavorite ? 'movie-check' : 'movie-open-plus'}
            size={30}
            color={item.isFavorite ? '#rgb(87, 208, 0)' : colors.primary700}
          />
        </AppButton>
      </MovieListItem>
    );
  };

  return (
    <ActionSheet
      id={props.sheetId}
      containerStyle={{backgroundColor: colors.primary500}}
      indicatorStyle={{backgroundColor: colors.primary700}}
      snapPoints={[50, 90]}
      initialSnapIndex={1}
      gestureEnabled={!disableGesture}
      headerAlwaysVisible={true}>
      <View style={styles.sheetContainer}>
        <SearchBar keyword={search} setKeyword={setSearch} />
        {lists.length > 0 && (
          <FlatList
            data={Array.from({length: 10}, (_, index) => ({
              id: index,
              title: `Lorem ipsum movie ${index + 1}`,
              poster_path: null,
              isFavorite: index % 2 === 0 ? true : false,
              overview:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            }))}
            // keyExtractor={item => item.id.toString()}
            style={[{marginBottom: vs(60), marginTop: vs(10)}]}
            renderItem={renderItem}
            onScrollBeginDrag={() => setDisableGesture(true)}
            onScrollEndDrag={() => setDisableGesture(false)}
            contentContainerStyle={{
              paddingVertical: vs(20),
            }}
            showsVerticalScrollIndicator={false}
          />
        )}
        {/* <Button
            title="Search"
            onPress={() => {
              // addMovieToList(
              //   {
              //     id: 12,
              //     title: 'hello',
              //     poster_path: null,
              //     overview: 'testing this shit',
              //   },
              //   7725,
              // );
              removeMovieFromlist(12, 7725);
              addMovieRef.current?.hide();
            }}
          /> */}
      </View>
    </ActionSheet>
  );
};

export default AddToListSheet;

const styles = StyleSheet.create({
  sheetContainer: {
    paddingTop: vs(10),
    minHeight: height * 0.8,
  },
  addIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: hs(4),
    borderRadius: hs(8),
  },
});
