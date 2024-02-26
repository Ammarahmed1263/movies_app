import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import FavoriteScreen from './src/screens/FavoriteScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import GlobalStyles from './src/utils/GlobalStyles';
import {StatusBar, useWindowDimensions} from 'react-native';

const Tab = createBottomTabNavigator();

function AppStack() {
  const {width} = useWindowDimensions();

  return (
    <Tab.Navigator
      sceneContainerStyle={{backgroundColor: GlobalStyles.primary500}}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderRadius: width / 2,
          marginHorizontal: 20,
          position: 'absolute',
          bottom: 10,
          overflow: 'hidden',
          height: 57,
        },
        tabBarLabelStyle: {marginVertical: 8},
      }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Favorite" component={FavoriteScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
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
