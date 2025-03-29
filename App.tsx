import useNetworkStatus from '@hooks/useNetworkStatus';
import useNotifications from '@hooks/useNotifications';
import {useEffect} from 'react';
import {I18nManager} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
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
      console.log('app started');
      if (i18n.language === 'ar') {
        I18nManager.allowRTL(true);
        I18nManager.forceRTL(true);
      } else {
        I18nManager.allowRTL(false);
        I18nManager.forceRTL(false);
      }

      if (!isNetworkConnected) {
        console.warn("device isn't connected to the internet");
      }

      console.log('splash hidden');
      RNBootSplash.hide({fade: true});
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
