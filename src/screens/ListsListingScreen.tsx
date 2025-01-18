import AppButton from '@atoms/AppButton';
import AppText from '@atoms/AppText';
import useLists from '@hooks/useLists';
import ListCard from '@molecules/ListCard';
import {useNavigation} from '@react-navigation/native';
import {hs, ms, vs, width} from '@styles/metrics';
import {FC, useLayoutEffect} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  ListNavigationProp,
  ListsFlatlistScreenProps,
} from 'types/listsStackTypes';
import {ListType} from 'types/userTypes';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@contexts/ThemeContext';


const ListsListingScreen: FC<ListsFlatlistScreenProps> = ({navigation}) => {
  const {lists} = useLists();
  const { colors } = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: ({canGoBack}) =>
        canGoBack ? (
          <AppButton onPress={() => navigation.goBack()} flat>
            <Icon
              name="chevron-back"
              size={ms(23)}
              color={colors.paleShade}
            />
          </AppButton>
        ) : null,
    })
  }, [navigation])
  
  const handleItemPress = (item: ListType) => {
    if (item.id === 'add') {
      navigation.push('CreateList');
    } else {
      navigation.push('ListDetailsScreen', {listData: item});
    }
  };

  const handleRender = ({item, index}: {item: ListType; index: number}) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.row}
        onPress={() => handleItemPress(item)}>
        <View>
          <ListCard
            data={item}
            onPress={() => console.log('pressed')}
            hasTitle={false}
            style={styles.listImage}
            disabled
          />
        </View>
        <View style={styles.text}>
          <AppText variant="subheading">{item.title}</AppText>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={lists}
      keyExtractor={item => item.id.toString()}
      renderItem={handleRender}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

export default ListsListingScreen;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingHorizontal: hs(10),
  },
  listImage: {
    width: width / 4,
    borderRadius: hs(12),
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#959595',
    marginTop: vs(15),
    marginBottom: vs(5),
  },
  text: {
    flex: 1,
    justifyContent: 'center',
    padding: hs(10),
  },
});
