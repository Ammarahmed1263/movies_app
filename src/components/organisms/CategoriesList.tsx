import AppText from '@atoms/AppText';
import { useTheme } from '@contexts/ThemeContext';
import {FC} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import { Genre } from 'types/movieTypes';

interface CategoriesListProps {
  categories: Genre[];
}

const CategoriesList: FC<CategoriesListProps> = ({categories}) => {
  const { colors } = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1, paddingHorizontal: 8}}
      alwaysBounceHorizontal={false}>
      {categories.map(genre => (
        <View
          key={genre.id}
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
        </View>
      ))}
    </ScrollView>
  );
};

export default CategoriesList;

const styles = StyleSheet.create({
  categoryPill: {
    marginHorizontal: 5,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
