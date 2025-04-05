import {useTheme} from '@contexts/ThemeContext';
import {useAppDispatch, useAppSelector} from '@hooks/useRedux';
import messaging from '@react-native-firebase/messaging';
import {
  clearFCMToken,
  updateUserPreferences as updateUserPreferencesAction,
} from '@redux/userSlice';
import {updateUserPreferences} from '@services/userService';
import i18n from 'i18n';
import RNRestart from 'react-native-restart';

export const useProfileSettings = () => {
  const {theme, toggleTheme: toggleAppTheme} = useTheme();
  const dispatch = useAppDispatch();
  const {notification, language} = useAppSelector(
    state => state.user.preferences,
  );

  const toggleTheme = async () => {
    toggleAppTheme();
    await updateUserPreferences({
      theme: theme === 'dark' ? 'light' : 'dark',
    });
  };

  const toggleLanguage = async () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    dispatch(updateUserPreferencesAction({language: newLanguage}));
    await i18n.changeLanguage(newLanguage);
    await updateUserPreferences({language: newLanguage});
    RNRestart.restart();
  };

  const toggleNotification = async () => {
    let newNotification = !notification;

    try {
      if (!newNotification) {
        await messaging().deleteToken();
        dispatch(clearFCMToken());
      }
      dispatch(updateUserPreferencesAction({notification: newNotification}));
      await updateUserPreferences({
        notification: newNotification,
      });
    } catch (error: any) {
      console.log('error toggling notification', error.message);
    }
  };

  return {
    toggleTheme,
    toggleLanguage,
    toggleNotification,
    notification,
    language,
    theme,
  };
};
