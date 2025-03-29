import {useTheme} from '@contexts/ThemeContext';
import {useAppDispatch, useAppSelector} from '@hooks/useRedux';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {clearUserToken, setUserToken} from '@redux/userSlice';
import {useEffect, useMemo, useState} from 'react';
import {StatusBar} from 'react-native';
import {SheetProvider} from 'react-native-actions-sheet';
import {navigationRef} from 'utils/navigation';
import '../sheets';
import AuthStack from './AuthStack';
import MainStack from './MainStack';

export default function AppNavigation() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const dispatch = useAppDispatch();
  const {colors, fonts, theme} = useTheme();

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    setUser(user);

    if (user) {
      dispatch(setUserToken(user.uid));
    } else {
      dispatch(clearUserToken());
    }
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(onAuthStateChanged);
    return () => {
      unsubscribe();
    };
  }, []);

  const navigationTheme = useMemo(() => {
    const navTheme = {
      dark: theme === 'dark',
      colors: {
        primary: colors.primary500,
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
    <NavigationContainer theme={navigationTheme} ref={navigationRef}>
      <SheetProvider>
        <StatusBar backgroundColor={colors.primary500} />
        {user ? <MainStack colors={colors} fonts={fonts} /> : <AuthStack />}
      </SheetProvider>
    </NavigationContainer>
  );
}
