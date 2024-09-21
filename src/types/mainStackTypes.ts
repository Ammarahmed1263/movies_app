import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack"
import { ColorsType, FontsType } from "./themeTypes"
import { NavigatorScreenParams } from "@react-navigation/native"
import { MainTabsParamList } from "./mainTabsTypes"

export type MainStackParamList = {
  BottomTabs: { colors: ColorsType, fonts: FontsType } & NavigatorScreenParams<MainTabsParamList>,
  MovieDetails: {id: number},
  CastMemberDetails: {id: number},
  MovieListing: { category?: string, colors?: ColorsType },
}

export type MovieListingScreenProps = NativeStackScreenProps<MainStackParamList, 'MovieListing'>
export type CastMemberScreenProps = NativeStackScreenProps<MainStackParamList, 'CastMemberDetails'>
export type MovieDetailsScreenProps = NativeStackScreenProps<MainStackParamList, 'MovieDetails'>
export type MainTabsProps = NativeStackScreenProps<MainStackParamList, 'BottomTabs'>

export type MainTabsNavigationProp = NativeStackNavigationProp<MainStackParamList, 'BottomTabs'>
export type CastMemberDetailsNavigationProp = NativeStackNavigationProp<MainStackParamList, 'CastMemberDetails'>
export type MovieDetailsNavigationProp = NativeStackNavigationProp<MainStackParamList, 'MovieDetails'>
export type MovieListingNavigationProp = NativeStackNavigationProp<MainStackParamList, 'MovieListing'>
