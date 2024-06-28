import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MovieDetails from '../screens/DetailsScreen';
import MainTabs from './MainTabs';

const Stack = createNativeStackNavigator();
function MainStack({ colors }) {

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="BottomTabs" component={MainTabs} initialParams={{colors}}/>
      <Stack.Screen name="MovieDetails" component={MovieDetails} options={{
        contentStyle: {backgroundColor: colors.primary500},

      }}/>
    </Stack.Navigator>
  );
}

export default MainStack;
