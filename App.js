import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import Home from './src/navigation/Home';
import Search from './src/navigation/Search';
import Favorite from './src/navigation/Favorite';
import Profile from './src/navigation/Profile';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name='Home' component={Home}/>        
        <Tab.Screen name='Search' component={Search}/>        
        <Tab.Screen name='Favorite' component={Favorite}/>        
        <Tab.Screen name='Profile' component={Profile}/>        
      </Tab.Navigator>
    </NavigationContainer>
  );
}