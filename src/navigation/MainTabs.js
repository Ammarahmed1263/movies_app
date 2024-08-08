import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { HomeScreen, SearchScreen, FavoritesScreen, ProfileScreen } from "../screens";
import { useTranslation } from "react-i18next";

const Tab = createBottomTabNavigator();
function MainTabs({route}) {
  const {colors} = route.params;
  const { t } = useTranslation();
  function getTabBarIcon({focused, color, size}, activeIcon, inActiveIcon) {
    const icon = focused ? activeIcon : inActiveIcon;

    return <Icon name={icon} size={size} color={color} />;
  }

  return (
    <Tab.Navigator
      sceneContainerStyle={{
        paddingBottom: 65,
        backgroundColor: colors.primary500,
      }}
      screenOptions={{
        headerShown: false,
        headerTitleStyle: {
          color: colors.paleShade,
        },
        headerStyle: {
          backgroundColor: colors.primary500,
        },
        tabBarStyle: {
          ...styles.tabBar,
          backgroundColor: colors.primary500,
          borderColor: colors.secondary600,
        },
        tabBarLabelStyle: {marginBottom: 8},
        tabBarActiveTintColor: colors.secondary500,
        tabBarInactiveTintColor: colors.primary700,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: t("home"),
          tabBarIcon: iconState =>
            getTabBarIcon(iconState, 'home', 'home-outline'),
        }}
        initialParams={{colors}}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: t('search'),
          tabBarIcon: iconState =>
            getTabBarIcon(iconState, 'search-sharp', 'search-outline'),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: t('favorite'),
          headerShown: true,
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          tabBarIcon: iconState =>
            getTabBarIcon({...iconState, size: 27}, 'star', 'star-outline'),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: t('profile'),
          tabBarIcon: iconState =>
            getTabBarIcon(iconState, 'person-circle', 'person-circle-outline'),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTabs;

const styles = StyleSheet.create({
  tabBar: {
    borderRadius: 30,
    marginHorizontal: 18,
    paddingVertical: 6,
    position: 'absolute',
    bottom: 10,
    overflow: 'hidden',
    height: 60,
    borderTopWidth: 1.6,
    borderBottomWidth: 1.6,
    borderWidth: 0.9,
  },
});
