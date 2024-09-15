import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen, SignupScreen } from "@screens/index";
import { useTheme } from "@contexts/ThemeContext";
import { AuthStackParamList } from "types/authStackTypes";


const Stack = createNativeStackNavigator<AuthStackParamList>();

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