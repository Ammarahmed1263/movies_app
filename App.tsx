import ThemeProvider from './src/contexts/ThemeContext';
import AppNavigation from './src/navigation/AppNavigation';
import {I18nManager} from 'react-native';
import {useEffect, useState} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import i18n from './src/i18n';
import useNetworkStatus from '@hooks/useNetworkStatus';

export default function App() {
  const isNetworkConnected = useNetworkStatus();

  useEffect(() => {
    if (i18n.language === 'ar') {
      I18nManager.forceRTL(true);
    } else {
      I18nManager.forceRTL(false);
    }

    if (!isNetworkConnected) {
      console.warn("device isn't connected to the internet");
    }
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ThemeProvider>
        <AppNavigation />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
