import useNetworkStatus from '@hooks/useNetworkStatus';
import useNotifications from '@hooks/useNotifications';
import {getUserProfile} from '@services/userService';
import {useEffect} from 'react';
import {I18nManager} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import ThemeProvider from './src/contexts/ThemeContext';
import i18n from './src/i18n';
import AppNavigation from './src/navigation/AppNavigation';
import {store} from './src/redux/store';

export default function App() {
  const isNetworkConnected = useNetworkStatus();
  useNotifications();

  useEffect(() => {
    (async () => {
      const user = await getUserProfile();

      if (user?.userPreferences?.language) {
        i18n.changeLanguage(user.userPreferences.language);
      }

      if (i18n.language === 'ar') {
        I18nManager.forceRTL(true);
      } else {
        I18nManager.forceRTL(false);
      }

      if (!isNetworkConnected) {
        console.warn("device isn't connected to the internet");
      }
    })();
  }, []);

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        <ThemeProvider>
          <AppNavigation />
        </ThemeProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}
