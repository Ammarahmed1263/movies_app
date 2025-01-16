import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type UserListStackParamList = {
  CreateUserList: undefined
  ListUserLists: undefined
  UserListDetails: undefined
};

export type UserListNavigationProp = NativeStackNavigationProp<UserListStackParamList>;