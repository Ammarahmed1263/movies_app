import AppText from '@atoms/AppText';
import {useTheme} from '@contexts/ThemeContext';
import {useNavigation} from '@react-navigation/native';
import {ms} from '@styles/metrics';
import {FC} from 'react';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {Genre} from 'types/movieTypes';

interface CategoriesListProps {
  categories: Genre[];
}

const CategoriesList: FC<CategoriesListProps> = ({categories}) => {
  const {colors} = useTheme();
  const navigation = useNavigation<any>();

  const handleCategoryPress = (genre: Genre) => {
    navigation.push('MovieListing', {
      type: 'genre',
      value: String(genre.id),
      title: genre.name,
    });
  };

  const CategoryItem = ({genre}: {genre: Genre}) => {
    return (
      <TouchableOpacity
        key={genre.id}
        onPress={() => handleCategoryPress(genre)}
        activeOpacity={0.7}
        style={{
          ...styles.categoryPill,
          backgroundColor: colors.primary700,
        }}>
        <AppText
          variant="light"
          style={{
            color: colors.primary500,
          }}>
          {genre.name}
        </AppText>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      keyExtractor={item => String(item.id)}
      data={categories}
      renderItem={({item}: {item: Genre}) => <CategoryItem genre={item} />}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        paddingHorizontal: 8,
      }}
      alwaysBounceHorizontal={false}
    />
  );
};

export default CategoriesList;

const styles = StyleSheet.create({
  categoryPill: {
    marginHorizontal: 5,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: ms(6),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
