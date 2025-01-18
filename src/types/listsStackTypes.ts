import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

export type ListstackParamList = {
  CreateUserList: undefined
  ListsFlatlist: undefined
  ListDetailsScreen: {listTitle: string}
};

export type UserListNavigationProp = NativeStackNavigationProp<ListstackParamList>;
export type ListDetailsScreenScreenProps = NativeStackScreenProps<ListstackParamList, 'ListDetailsScreen'>
