import {useTheme} from '@contexts/ThemeContext';
import {useAppDispatch, useAppSelector} from '@hooks/useRedux';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {
  clearUserToken,
  setUserToken,
  updateUserPreferences,
} from '@redux/userSlice';
import {useEffect, useMemo, useState} from 'react';
import {I18nManager, StatusBar} from 'react-native';
import {SheetProvider} from 'react-native-actions-sheet';
import {navigationRef} from 'utils/navigation';
import '../sheets';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import {getUserProfile} from '@services/userService';
import {getDeviceLanguage} from '@utils';
import useNotifications from '@hooks/useNotifications';
import i18n from 'i18n';

export default function AppNavigation() {
  const [initializing, setInitializing] = useState(true);
  const {userToken} = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const {colors, fonts, theme} = useTheme();
  useNotifications();

  const onAuthStateChanged = async (user: FirebaseAuthTypes.User | null) => {
    dispatch(user ? setUserToken(user.uid) : clearUserToken());

    const userExists = await getUserProfile();
    const language =
      userExists?.userPreferences?.language || getDeviceLanguage();

    dispatch(
      updateUserPreferences({
        language,
        notification: userExists?.userPreferences?.notification,
      }),
    );

    i18n.changeLanguage(language).then(() => {
      setInitializing(false);
    });
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
        {userToken ? (
          <MainStack colors={colors} fonts={fonts} />
        ) : (
          <AuthStack />
        )}
      </SheetProvider>
    </NavigationContainer>
  );
}
