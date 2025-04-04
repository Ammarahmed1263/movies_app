import useNetworkStatus from '@hooks/useNetworkStatus';
import {useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import ThemeProvider from './src/contexts/ThemeContext';
import AppNavigation from './src/navigation/AppNavigation';
import {store} from './src/redux/store';
import 'i18n';

export default function App() {
  const isNetworkConnected = useNetworkStatus();

  useEffect(() => {
    (async () => {
      console.log('app started');

      if (!isNetworkConnected) {
        console.warn("device isn't connected to the internet");
      }

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
