import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type CollectionStackParamList = {
  CreateCollection: undefined
  ListCollections: undefined
  CollectionDetails: undefined
};

export type CollectionNavigationProp = NativeStackNavigationProp<CollectionStackParamList>;