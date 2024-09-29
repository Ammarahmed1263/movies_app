import {FC} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  HomeScreen,
  SearchScreen,
  FavoritesScreen,
  ProfileScreen,
} from '@screens/index';
import {useTranslation} from 'react-i18next';
import {MainTabsParamList} from 'types/mainTabsTypes';
import {MainTabsProps} from 'types/mainStackTypes';

const Tab = createBottomTabNavigator<MainTabsParamList>();

const MainTabs: FC<MainTabsProps> = ({route}) => {
  const {colors, fonts} = route.params;
  const {t} = useTranslation();

  function getTabBarIcon(
    {focused, color, size}: {focused: boolean; color: string; size: number},
    activeIcon: string,
    inActiveIcon: string,
  ) {
    const icon = focused ? activeIcon : inActiveIcon;

    return <Icon name={icon} size={size} color={color} />;
  }

  return (
    <Tab.Navigator
      sceneContainerStyle={{
        paddingBottom: 65,
        // backgroundColor: colors.primary500,
      }}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          ...styles.tabBar,
          // backgroundColor: colors.primary500,
          borderColor: colors.secondary600,
        },
        tabBarLabelStyle: {
          marginBottom: 4,
          fontFamily: fonts.regular.fontFamily,
        },
        tabBarActiveTintColor: colors.secondary500,
        tabBarInactiveTintColor: colors.primary700,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: t('home'),
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
            getTabBarIcon({...iconState, size: 27}, 'heart', 'heart-outline'),
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
};

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
