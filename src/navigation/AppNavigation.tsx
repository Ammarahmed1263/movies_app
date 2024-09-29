import {useEffect, useMemo, useState} from 'react';
import {StatusBar} from 'react-native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {useTheme} from '@contexts/ThemeContext';
import AuthStack from './AuthStack';
import MainStack from './MainStack';

export default function AppNavigation() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const {colors, fonts, theme} = useTheme();
  console.log('theme in navigation: ', theme);
  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    console.log('active user data: ', user);
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const navigationTheme = useMemo(() => {
    const navTheme = {
      dark: theme === 'dark',
      colors: {
        ...DefaultTheme.colors,
        background: colors.primary500,
        card: colors.primary500,
        text: colors.paleShade,
        border: colors.secondary600,
        notification: colors.secondary500,
      },
    };
    return navTheme;
  }, [theme, colors]);

  if (initializing) return null;

  return (
    <NavigationContainer theme={navigationTheme}>
      <StatusBar backgroundColor={colors.primary500} />
      {user ? <MainStack colors={colors} fonts={fonts} /> : <AuthStack />}
    </NavigationContainer>
  );
}
