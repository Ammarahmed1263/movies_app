import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar, useWindowDimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import FavoriteScreen from './src/screens/FavoriteScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import GlobalStyles from './src/utils/GlobalStyles';

const Tab = createBottomTabNavigator();

function AppStack() {
  const {width} = useWindowDimensions();

  function getTabBarIcon({ focused, color, size }, activeIcon, inActiveIcon) {
    const icon = focused ? activeIcon : inActiveIcon;

    return <Icon name={icon} size={size} color={color}/>;
  }

  return (
    <Tab.Navigator
      sceneContainerStyle={{backgroundColor: GlobalStyles.primary500}}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderRadius: width / 2,
          marginHorizontal: 18,
          paddingVertical: 6,
          position: 'absolute',
          bottom: 14,
          overflow: 'hidden',
          height: 60,
          backgroundColor: GlobalStyles.primary500,
          borderTopWidth: 0.7,
          borderWidth: 0.7,
          borderColor: GlobalStyles.secondary600,
        },
        tabBarLabelStyle: { marginBottom: 8 },
        tabBarActiveTintColor: GlobalStyles.secondary500,
      }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{
        tabBarIcon: (iconState) => getTabBarIcon(iconState, 'home', 'home-outline')
      }}/>
      <Tab.Screen name="Search" component={SearchScreen} options={{
        tabBarIcon: (iconState) => getTabBarIcon(iconState, 'search-sharp', 'search-outline')
      }}/>
      <Tab.Screen name="Favorite" component={FavoriteScreen} options={{
        tabBarIcon: (iconState) => getTabBarIcon(iconState, 'star', 'star-outline')
      }}/>
      <Tab.Screen name="Profile" component={ProfileScreen} options={{
        tabBarIcon: (iconState) => getTabBarIcon(iconState, 'person', 'person-outline')
      }}/>
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: GlobalStyles.primary500,
        },
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  const authorized = true;

  return (
    <>
      <StatusBar backgroundColor={GlobalStyles.primary500} />
      <NavigationContainer>
        {authorized ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </>
  );
}
