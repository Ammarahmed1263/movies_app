import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GlobalStyles from "../utils/GlobalStyles";
import FavoritesScreen from "../screens/FavoritesScreen";
import MovieDetails from "../screens/MovieDetails";

const Stack = createNativeStackNavigator();

function FavoritesStack() {
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false,
      contentStyle: {
        backgroundColor: GlobalStyles.primary500,
      },
    }}>
    <Stack.Screen name="Favorite" component={FavoritesScreen} />
    <Stack.Screen name="MovieDetails" component={MovieDetails} />
  </Stack.Navigator>
  )
}

export default FavoritesStack;