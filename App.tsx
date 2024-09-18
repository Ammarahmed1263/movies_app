import ThemeProvider from './src/contexts/ThemeContext';
import AppNavigation from './src/navigation/AppNavigation';
import './src/i18n'
import { I18nManager } from 'react-native';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  useEffect(() => {
    if (I18nManager.isRTL) {
      I18nManager.forceRTL(true);
    }
  }, [])

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ThemeProvider>
        <AppNavigation />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
