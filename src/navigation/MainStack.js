import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTabs from './MainTabs';
import { MovieDetailsScreen, MoviesList, CastMemberScreen } from '../screens';

const Stack = createNativeStackNavigator();
function MainStack({colors, fonts}) {
  // TODO: initial params inconsistency
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
      <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} />
      <Stack.Screen name="CastMemberDetails" component={CastMemberScreen} />
      <Stack.Screen
        name="seeAllMovies"
        component={MoviesList}
        initialParams={{colors}}
        options={{
          headerShown: true,
          title: 'All Movies',
          headerStyle: {backgroundColor: colors.primary500, shadowColor: 'red'},
          headerTintColor: colors.paleShade,
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitleStyle: {fontFamily: fonts.regular}
        }}
      />
    </Stack.Navigator>
  );
}

export default MainStack;
