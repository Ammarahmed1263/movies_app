import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

export type ListstackParamList = {
  CreateUserList: undefined
  ListLists: undefined
  UserListDetails: {listTitle: string}
};

export type UserListNavigationProp = NativeStackNavigationProp<ListstackParamList>;
export type UserListDetailsScreenProps = NativeStackScreenProps<ListstackParamList, 'UserListDetails'>
