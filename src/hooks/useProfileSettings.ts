import {useAppDispatch, useAppSelector} from '@hooks/useRedux';
import {updateUserPreferences as updateUserPreferencesAction} from '@redux/userSlice';
import {updateUserPreferences} from '@services/userService';
import {useTheme} from '@contexts/ThemeContext';
import i18n from 'i18n';
import RNRestart from 'react-native-restart';
import messaging from '@react-native-firebase/messaging';

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
    const newLanguage: 'en' | 'ar' = language === 'en' ? 'ar' : 'en';
    dispatch(updateUserPreferencesAction({language: newLanguage}));
    await i18n.changeLanguage(newLanguage);
    await updateUserPreferences({language: newLanguage});
    RNRestart.restart();
  };

  const toggleNotification = async () => {
    let newNotification = !notification;
    if (!newNotification) {
      await messaging().deleteToken();
      console.log('token deleted');
    }
    dispatch(updateUserPreferencesAction({notification: newNotification}));
    await updateUserPreferences({
      notification: newNotification,
    });
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
