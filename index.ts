/**
 * @format
 */
if (__DEV__) {
  require('./ReactotronConfig');
}
(globalThis as any).RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS = true;

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import {
  displayNotification,
  handleNotificationAction,
} from '@hooks/useNotifications';
import {NotificationValues} from 'types/notificationTypes';
import notifee, {EventType} from '@notifee/react-native';
import {deepLinking} from '@utils';

messaging().setBackgroundMessageHandler(displayNotification);

notifee.onBackgroundEvent(async ({type, detail}) => {
  if (type === EventType.ACTION_PRESS && detail.pressAction) {
    await handleNotificationAction(
      detail.notification?.data?.type as NotificationValues,
      detail.pressAction.id,
      detail.notification?.data,
    );
  }

  if (detail.notification?.data?.redirection) {
    await deepLinking(detail.notification.data.redirection as string);
  }
});

AppRegistry.registerComponent(appName, () => App);
