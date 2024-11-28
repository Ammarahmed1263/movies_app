import AppButton from '@atoms/AppButton';
import AppText from '@atoms/AppText';
import {useTheme} from '@contexts/ThemeContext';
import CollectionCard from '@molecules/CollectionCard';
import {hs, vs, width} from '@styles/metrics';
import {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface CollectionsListProps {
  title: string;
  seeAll?: boolean;
}

const CollectionsList: FC<CollectionsListProps> = ({title, seeAll = false}) => {
  const data = [
    {id: 'add', label: 'Add New Collection'},
    {id: '3', label: 'collection 3', movies: [1, 2, 3]},
    {id: '5', label: 'collection 5', movies: [1, 2]},
    {id: '1', label: 'collection 1', movies: [1, 2, 3, 4]},
    {id: '2', label: 'collection 2', movies: [1, 2, 3, 4, 5]},
    {id: '4', label: 'collection 4', movies: [1, 2, 5]},
    // {id: '6', label: 'collection 6', movies: [1,2,3,4,5]},
  ];
  const {colors} = useTheme();
  const {t} = useTranslation();

  const handleItemPress = (item: {id: string; label: string}) => {
    if (item.id === 'add') {
      Alert.alert('Add Button Pressed', 'You clicked the Add button!');
    } else {
      Alert.alert('Item Pressed', `You clicked on ${item.label}`);
    }
  };

  const handleRender = ({
    item,
    index,
  }: {
    item: {id: string; label: string; movies?: number[] | undefined};
    index: number;
  }) => {
    return <CollectionCard key={index} data={item} onPress={handleItemPress} />;
  };

  return (
    <View>
      <View style={styles.header}>
        <View style={styles.title}>
          <Icon
            name="movie"
            size={25}
            style={styles.icon}
            color={colors.paleShade}
          />
          <AppText variant="bold">{title}</AppText>
        </View>
        {seeAll && (
          <AppButton
            variant="body"
            textStyle={{
              ...styles.button,
              color: colors.secondary500,
            }}
            onPress={() => console.log('hello, world')}
            flat>
            {t('see_all')}
          </AppButton>
        )}
      </View>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={handleRender}
        horizontal
        contentContainerStyle={styles.listContainer}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default CollectionsList;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: hs(12),
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: vs(10),
  },
  icon: {
    paddingEnd: hs(10)
  },
  button: {
    textTransform: 'none',
  },
  listContainer: {
    paddingHorizontal: hs(12),
    gap: hs(8),
  },
});
