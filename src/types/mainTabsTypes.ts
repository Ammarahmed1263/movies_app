import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { ColorsType } from "./themeTypes"

export type MainTabsParamList = {
  Home: {colors: ColorsType} | undefined
  Search: undefined
  Favorites: undefined
  Profile: undefined
}

export type HomeNavigationProp = BottomTabNavigationProp<MainTabsParamList, 'Home'>;