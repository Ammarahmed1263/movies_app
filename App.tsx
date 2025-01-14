import ThemeProvider from './src/contexts/ThemeContext';
import AppNavigation from './src/navigation/AppNavigation';
import {Alert, I18nManager, Platform} from 'react-native';
import {useEffect, useState} from 'react';
import RNRestart from 'react-native-restart';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import i18n from './src/i18n';
import useNetworkStatus from '@hooks/useNetworkStatus';
import {getUserProfile} from '@services/userService';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';
import useNotifications from '@hooks/useNotifications';

export default function App() {
  const isNetworkConnected = useNetworkStatus();
  useNotifications();
  async function requestNotificationPermission() {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Notification permission granted');
    } else {
      console.log('Notification permission denied');
    }
  }

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android') {
        requestNotificationPermission();
      }
      requestUserPermission();
      messaging()
        .getToken()
        .then(token => {
          console.log('FCM Token:', token);
          // Send this token to your server for sending messages
        });
      messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
      });

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

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
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
