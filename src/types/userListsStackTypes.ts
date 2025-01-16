import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

export type UserListStackParamList = {
  CreateUserList: undefined
  ListUserLists: undefined
  UserListDetails: {listTitle: string}
};

export type UserListNavigationProp = NativeStackNavigationProp<UserListStackParamList>;
export type UserListDetailsScreenProps = NativeStackScreenProps<UserListStackParamList, 'UserListDetails'>
