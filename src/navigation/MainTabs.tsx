import {FC} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const Ionicons = Icon as any;
import {
  HomeScreen,
  SearchScreen,
  FavoritesScreen,
  ProfileScreen,
} from '@screens';
import {useTranslation} from 'react-i18next';
import {MainTabsParamList} from 'types/mainTabsTypes';
import {MainTabsProps} from 'types/mainStackTypes';
import {hs, ms, width} from '@styles/metrics';
import {useTheme} from '@contexts/ThemeContext';

const Tab = createBottomTabNavigator<MainTabsParamList>();

const MainTabs: FC<MainTabsProps> = () => {
  const {colors, fonts} = useTheme();
  const {t} = useTranslation();

  function getTabBarIcon(
    {focused, color, size}: {focused: boolean; color: string; size: number},
    activeIcon: string,
    inActiveIcon: string,
  ) {
    const icon = focused ? activeIcon : inActiveIcon;

    return <Ionicons name={icon} size={size} color={color} />;
  }

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          ...styles.tabBar,
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
    width: '90%',
    height: hs(60),
    position: 'absolute',
    bottom: hs(25),
    left: width / 2 - width * 0.45,
    overflow: 'hidden',
    borderRadius: ms(30),
    borderWidth: 1,
    borderTopWidth: 1.6,
    borderBottomWidth: 1.6,
    borderRightWidth: 0.9,
    borderLeftWidth: 0.9,
    paddingBottom: 0,
    paddingVertical: 6,
  },
});
