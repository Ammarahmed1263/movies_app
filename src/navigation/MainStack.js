import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTabs from './MainTabs';
import MovieStack from './MovieStack';

const Stack = createNativeStackNavigator();
function MainStack({ colors }) {

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="BottomTabs" component={MainTabs} initialParams={{colors}}/>
      <Stack.Screen name="MovieStack" component={MovieStack} initialParams={{colors}}/>
    </Stack.Navigator>
  );
}

export default MainStack;
