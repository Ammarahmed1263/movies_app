import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FavoritesStack from './FavoritesStack';
import GlobalStyles from '../utils/GlobalStyles';
import MoviesStack from './MoviesStack';

const Tab = createBottomTabNavigator();

function BottomTabs() {

  function getTabBarIcon({focused, color, size}, activeIcon, inActiveIcon) {
    const icon = focused ? activeIcon : inActiveIcon;

    return <Icon name={icon} size={size} color={color} />;
  }

  return (
    <Tab.Navigator
      sceneContainerStyle={styles.content}
      screenOptions={{
        headerShown: false,
        headerTitleStyle: {
          color: 'white',
        },
        headerStyle: {
          backgroundColor: GlobalStyles.primary500,
        },
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: {marginBottom: 8},
        tabBarActiveTintColor: GlobalStyles.secondary500,
        tabBarInactiveTintColor: GlobalStyles.primary700,
      }}>
      <Tab.Screen
        name="HomeStack"
        component={MoviesStack}
        options={{
          title: 'Home',
          tabBarIcon: iconState =>
            getTabBarIcon(iconState, 'home', 'home-outline'),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: iconState =>
            getTabBarIcon(iconState, 'search-sharp', 'search-outline'),
        }}
      />
      <Tab.Screen
        name="FavoriteStack"
        component={FavoritesStack}
        options={{
          title: 'Favorites',
          headerShown: true,
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          tabBarIcon: iconState =>
            getTabBarIcon(iconState, 'star', 'star-outline'),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: iconState =>
            getTabBarIcon(iconState, 'person', 'person-outline'),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabs;

const styles = StyleSheet.create({
  content: {
    backgroundColor: GlobalStyles.primary500,
    paddingBottom: 65,
  },
  tabBar: {
    borderRadius: 30,
    marginHorizontal: 18,
    paddingVertical: 6,
    position: 'absolute',
    bottom: 10,
    overflow: 'hidden',
    height: 60,
    backgroundColor: GlobalStyles.primary500,
    borderTopWidth: 0.7,
    borderWidth: 0.7,
    borderColor: GlobalStyles.secondary600,
  },
});
