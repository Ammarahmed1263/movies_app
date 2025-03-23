import AppButton from '@atoms/AppButton';
import AppText from '@atoms/AppText';
import {useTheme} from '@contexts/ThemeContext';
import useLists from '@hooks/useLists';
import useOrientation from '@hooks/useOrientation';
import ListCard from '@molecules/ListCard';
import {hs, ms, vs} from '@styles/metrics';
import {FC, useLayoutEffect} from 'react';
import {
  FlatList,
  I18nManager,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {SheetManager} from 'react-native-actions-sheet';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ListsFlatlistScreenProps} from 'types/listsStackTypes';
import {ListType} from 'types/userTypes';

const ListsListingScreen: FC<ListsFlatlistScreenProps> = ({navigation}) => {
  const {lists} = useLists();
  const {colors} = useTheme();
  const {orientation, width} = useOrientation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: ({canGoBack}) =>
        canGoBack ? (
          <AppButton onPress={() => navigation.goBack()} flat>
            <Ionicons
              name={I18nManager.isRTL ? 'chevron-forward' : 'chevron-back'}
              size={ms(23)}
              color={colors.paleShade}
            />
          </AppButton>
        ) : null,
    });
  }, [navigation]);

  const onListCreated = (listId: number) => {
    navigation.navigate('ListDetailsScreen', {listId});
  };

  const handleItemPress = (item: ListType) => {
    if (item.id === 'add') {
      SheetManager.show('create-list', {payload: {onListCreated}});
    } else {
      navigation.push('ListDetailsScreen', {listId: item.id});
    }
  };

  const handleRender = ({item, index}: {item: ListType; index: number}) => {
    return (
      <TouchableOpacity key={index} onPress={() => handleItemPress(item)}>
        <View>
          <ListCard
            data={item}
            onPress={() => console.log('pressed')}
            hasTitle={false}
            style={{
              ...styles.listImage,
              width:
                orientation === 'landscape'
                  ? width / 3 - hs(12 * 5)
                  : width / 2.2,
            }}
            disabled
          />
        </View>
        <View style={styles.text}>
          <AppText variant="body">{item.title}</AppText>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <FlatList
        data={lists}
        keyExtractor={item => item.id.toString()}
        renderItem={handleRender}
        key={orientation}
        numColumns={orientation === 'landscape' ? 3 : 2}
        columnWrapperStyle={{
          gap: hs(12),
          marginBottom: vs(10),
          paddingHorizontal: hs(10),
        }}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        style={{
          height: '100%',
        }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default ListsListingScreen;

const styles = StyleSheet.create({
  listImage: {
    borderRadius: hs(20),
  },
  text: {
    flex: 1,
    alignItems: 'center',
    paddingTop: vs(10),
  },
});
