import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen, SignupScreen } from "../screens";
import { useTheme } from "../contexts/ThemeContext";

const Stack = createNativeStackNavigator();

function AuthStack() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.primary500,
        },
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

export default AuthStack;