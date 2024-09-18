import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack"
import { ColorsType } from "./themeTypes"
import { NavigatorScreenParams } from "@react-navigation/native"
import { MainTabsParamList } from "./mainTabsTypes"

export type MainStackParamList = {
  BottomTabs: { colors: ColorsType } & NavigatorScreenParams<MainTabsParamList>,
  MovieDetails: {id: number},
  CastMemberDetails: {id: number},
  MovieListing: { category?: string, colors?: ColorsType },
}

export type MovieListingScreenProps = NativeStackScreenProps<MainStackParamList, 'MovieListing'>
export type CastMemberScreenProps = NativeStackScreenProps<MainStackParamList, 'CastMemberDetails'>
export type MovieDetailsScreenProps = NativeStackScreenProps<MainStackParamList, 'MovieDetails'>
export type MainTabsProps = NativeStackScreenProps<MainStackParamList, 'BottomTabs'>

export type MainTabsNavigationProp = NativeStackNavigationProp<MainStackParamList, 'BottomTabs'>
