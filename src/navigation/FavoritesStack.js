import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FavoritesScreen from "../screens/FavoritesScreen";
import MovieDetails from "../screens/DetailsScreen";
import { useTheme } from "../store/context/ThemeContext";

const Stack = createNativeStackNavigator();

function FavoritesStack() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false,
      contentStyle: {
        backgroundColor: colors.primary500,
      },
    }}>
    <Stack.Screen name="Favorite" component={FavoritesScreen} />
    <Stack.Screen name="MovieDetails" component={MovieDetails} />
  </Stack.Navigator>
  )
}

export default FavoritesStack;