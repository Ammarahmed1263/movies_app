import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTabs from './MainTabs';
import MovieDetails from '../screens/DetailsScreen';
import CastMemberScreen from '../screens/CastMemberScreen';
import SeeAllMoviesScreen from '../screens/SeeAllMoviesScreen';

const Stack = createNativeStackNavigator();
function MainStack({colors}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: colors.primary500},
      }}>
      <Stack.Screen
        name="BottomTabs"
        component={MainTabs}
        initialParams={{colors}}
      />
      <Stack.Screen name="MovieDetails" component={MovieDetails} />
      <Stack.Screen name="CastMemberDetails" component={CastMemberScreen} />
      <Stack.Screen
        name="seeAllMovies"
        component={SeeAllMoviesScreen}
        initialParams={{colors}}
      />
    </Stack.Navigator>
  );
}

export default MainStack;
