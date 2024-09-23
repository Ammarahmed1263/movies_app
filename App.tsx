import ThemeProvider from './src/contexts/ThemeContext';
import AppNavigation from './src/navigation/AppNavigation';
import {I18nManager} from 'react-native';
import {useEffect} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import i18n from './src/i18n';

export default function App() {
  useEffect(() => {
    if (i18n.language === 'ar') {
      I18nManager.forceRTL(true);
    } else {
      I18nManager.forceRTL(false);
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
