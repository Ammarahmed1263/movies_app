import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack"
import { ColorsType } from "./themeTypes"
import { NavigatorScreenParams } from "@react-navigation/native"
import { MainTabsParamList } from "./mainTabsTypes"

export type MainStackParamList = {
  BottomTabs: NavigatorScreenParams<MainTabsParamList>,
  MovieDetails: {id: number},
  CastMemberDetails: {id: number},
  MovieListing: { category: string, colors?: ColorsType },
}

export type MovieListingScreenProps = NativeStackScreenProps<MainStackParamList, 'MovieListing'>
export type MainTabsProps = NativeStackScreenProps<MainStackParamList, 'BottomTabs'>

export type BottomTabsNavigationProp = NativeStackNavigationProp<MainStackParamList, 'BottomTabs'>
