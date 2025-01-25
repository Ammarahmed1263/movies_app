import AppButton from '@atoms/AppButton';
import AppText from '@atoms/AppText';
import {useTheme} from '@contexts/ThemeContext';
import useLists from '@hooks/useLists';
import ListCard from '@molecules/ListCard';
import {useNavigation} from '@react-navigation/native';
import {hs, vs} from '@styles/metrics';
import {FC, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, StyleSheet, View} from 'react-native';
import {SheetManager} from 'react-native-actions-sheet';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ListsFlatlistScreenProps} from 'types/listsStackTypes';
import {ListstackNavigationProp} from 'types/mainStackTypes';
import {ListType} from 'types/userTypes';

interface ListsFlatlistProps {
  title: string;
  seeAll?: boolean;
}

const ListsFlatlist: FC<ListsFlatlistProps> = ({title, seeAll = false}) => {
  const {lists} = useLists();
  const {colors} = useTheme();
  const {t} = useTranslation();
  const navigation = useNavigation<ListstackNavigationProp>();

  const onListCreated = (listId: number) => {
    navigation.navigate('Liststack', {
      screen: 'ListDetailsScreen',
      params: {listId},
    });
  };

  const handleItemPress = (item: ListType) => {
    if (item.id === 'add') {
      // navigation.navigate('Liststack', {screen: 'CreateList'});
      SheetManager.show('create-list', {payload: {onListCreated}});
    } else {
      navigation.navigate('Liststack', {
        screen: 'ListDetailsScreen',
        params: {listId: item.id},
      });
    }
  };

  const handleSeeAllPress = () => {
    navigation.navigate('Liststack', {screen: 'ListsFlatlist'});
  };

  const handleRender = ({item, index}: {item: ListType; index: number}) => {
    return <ListCard key={index} data={item} onPress={handleItemPress} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.title}>
          <Icon
            name="movie"
            size={30}
            style={styles.icon}
            color={colors.paleShade}
          />
          <AppText variant="heading">{title}</AppText>
        </View>
        {seeAll && (
          <AppButton
            variant="body"
            textStyle={{
              ...styles.button,
              color: colors.secondary500,
            }}
            onPress={handleSeeAllPress}
            flat>
            {t('see_all')}
          </AppButton>
        )}
      </View>
      <FlatList
        data={lists.slice(0, 6)}
        keyExtractor={item => item.id.toString()}
        renderItem={handleRender}
        horizontal
        contentContainerStyle={styles.listContainer}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default ListsFlatlist;

const styles = StyleSheet.create({
  container: {
    marginTop: vs(10),
    marginBottom: vs(20),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: hs(12),
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    paddingEnd: hs(10),
  },
  button: {
    textTransform: 'none',
  },
  listContainer: {
    flexGrow: 1,
    paddingHorizontal: hs(12),
    gap: hs(8),
  },
});
