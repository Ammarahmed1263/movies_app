import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { ListType } from './userTypes';

export type ListstackParamList = {
  CreateList: undefined
  ListsFlatlist: undefined
  ListDetailsScreen: {listId: number}
};

export type ListNavigationProp = NativeStackNavigationProp<ListstackParamList>;
export type ListDetailsScreenProps = NativeStackScreenProps<ListstackParamList, 'ListDetailsScreen'>
export type CreateListScreenProps = NativeStackScreenProps<ListstackParamList, 'CreateList'>
export type ListsFlatlistScreenProps = NativeStackScreenProps<ListstackParamList, 'ListsFlatlist'>
