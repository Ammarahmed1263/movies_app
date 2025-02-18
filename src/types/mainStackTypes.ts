import {NavigatorScreenParams} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {ListstackParamList} from './listsStackTypes';
import {MainTabsParamList} from './mainTabsTypes';

export type MainStackParamList = {
  BottomTabs: NavigatorScreenParams<MainTabsParamList>;
  MovieDetails: {id: number};
  CastMemberDetails: {id: number};
  MovieListing: {
    type: 'category' | 'genre';
    value: string;
    title?: string;
    time_window?: 'day' | 'week';
  };
  Liststack: {
    screen: keyof ListstackParamList;
    params?: ListstackParamList[keyof ListstackParamList];
  };
};

export type MovieListingScreenProps = NativeStackScreenProps<
  MainStackParamList,
  'MovieListing'
>;
export type CastMemberScreenProps = NativeStackScreenProps<
  MainStackParamList,
  'CastMemberDetails'
>;
export type MovieDetailsScreenProps = NativeStackScreenProps<
  MainStackParamList,
  'MovieDetails'
>;
export type MainTabsProps = NativeStackScreenProps<
  MainStackParamList,
  'BottomTabs'
>;
export type ListstackProps = NativeStackScreenProps<
  MainStackParamList,
  'Liststack'
>;

export type MainTabsNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'BottomTabs'
>;
export type CastMemberDetailsNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'CastMemberDetails'
>;
export type MovieDetailsNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'MovieDetails'
>;
export type MovieListingNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'MovieListing'
>;
export type ListstackNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'Liststack'
>;
