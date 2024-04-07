import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import MovieDetails from "../screens/DetailsScreen";

const Stack = createNativeStackNavigator();

function MoviesStack({ route }) {
  const { colors } = route.params

  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false,
      contentStyle: {
        backgroundColor: colors.primary500,
      },
    }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="MovieDetails" component={MovieDetails} />
  </Stack.Navigator>
  )
}

export default MoviesStack;