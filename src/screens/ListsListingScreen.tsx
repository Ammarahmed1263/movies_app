import AppText from '@atoms/AppText';
import useLists from '@hooks/useLists';
import ListCard from '@molecules/ListCard';
import { useNavigation } from '@react-navigation/native';
import { hs, vs, width } from '@styles/metrics';
import { FlatList, StyleSheet, View } from 'react-native';
import { ListType } from 'types/userTypes';

const ListsListingScreen = () => {
  const {lists} = useLists();
  const navigation = useNavigation();
  const handleRender = ({item, index}: {item: ListType; index: number}) => {
    return (
      <View key={index} style={{flexDirection: 'row'}}>
        <View>
          <ListCard
            data={item}
            onPress={() => console.log('pressed')}
            hasTitle={false}
            style={{width: width / 5, borderRadius: hs(12)}}
          />
        </View>
        <View style={{flex: 1, justifyContent: 'center', padding: hs(10)}}>
          <AppText variant="body">{item.title}</AppText>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={lists}
      keyExtractor={item => item.id.toString()}
      renderItem={handleRender}
      ItemSeparatorComponent={() => (
        <View style={{height: StyleSheet.hairlineWidth, backgroundColor: '#959595', marginTop: vs(15), marginBottom: vs(5)}} />
      )}
    />
  );
};

export default ListsListingScreen;
