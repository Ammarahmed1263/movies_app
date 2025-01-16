import AppText from '@atoms/AppText';
import useLists from '@hooks/useLists';
import MovieGrid from '@molecules/MovieGrid';
import UserListCard from '@molecules/UserListCard';
import { useNavigation } from '@react-navigation/native';
import { hs, vs, width } from '@styles/metrics';
import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import {UserListType} from 'types/userTypes';

const ListsListingScreen = () => {
  const {lists} = useLists();
  const navigation = useNavigation();
  const handleRender = ({item, index}: {item: UserListType; index: number}) => {
    return (
      <View key={index} style={{flexDirection: 'row', padding: hs(10)}}>
        <View>
          <UserListCard
            data={item}
            onPress={() => console.log('pressed')}
            hasTitle={false}
            style={{width: width / 5, aspectRatio: 1 / 1, borderRadius: hs(12)}}
          />
        </View>
        <View style={{flex: 1, justifyContent: 'center', padding: hs(10)}}>
          <AppText variant="body">{item.title}</AppText>
        </View>
        <Button title="Add new user list" onPress={() => navigation.goBack()} />
      </View>
    );
  };

  return (
    <FlatList
      data={lists}
      keyExtractor={item => item.id.toString()}
      renderItem={handleRender}
      ItemSeparatorComponent={() => (
        <View style={{height: StyleSheet.hairlineWidth, backgroundColor: '#959595'}} />
      )}
    />
  );
};

export default ListsListingScreen;
