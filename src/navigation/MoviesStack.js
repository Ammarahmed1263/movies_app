import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GlobalStyles from "../utils/GlobalStyles";
import HomeScreen from "../screens/HomeScreen";
import MovieDetails from "../screens/MovieDetails";

const Stack = createNativeStackNavigator();

function MoviesStack() {
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false,
      contentStyle: {
        backgroundColor: GlobalStyles.primary500,
      },
    }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="MovieDetails" component={MovieDetails} />
  </Stack.Navigator>
  )
}

export default MoviesStack;