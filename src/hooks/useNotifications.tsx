import notifee, {
  AndroidImportance,
  AndroidStyle,
  EventType,
} from '@notifee/react-native';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {addFavoriteMovie} from '@services/userService';
import {deepLinking} from '@utils';
import {useEffect} from 'react';
import {Alert, PermissionsAndroid, Platform} from 'react-native';
import {MovieSummary} from 'types/movieTypes';
import {NOTIFICATION_TYPES, NotificationValues} from 'types/notificationTypes';

export const handleNotificationAction = async (
  type: NotificationValues,
  actionId: string,
  data: any,
) => {
  try {
    switch (type) {
      case NOTIFICATION_TYPES.MOVIE:
        if (actionId === 'favorite') {
          const {id, title, overview, poster_path} = data as MovieSummary;
          await addFavoriteMovie({id, title, overview, poster_path});
        }
        break;
      // Add other type handlers here
    }

    // Handle navigation after action
    if (data?.redirection) {
      await deepLinking(data.redirection as string);
    }
  } catch (error) {
    console.error('notification action handle error: ', error);
  }
};

export const displayNotification = async (
  remoteMessage: FirebaseMessagingTypes.RemoteMessage,
) => {
  const {data, notification} = remoteMessage;
  const notificationType = data?.type as NotificationValues;

  const actions = [];
  if (notificationType === NOTIFICATION_TYPES.MOVIE) {
    actions.push({
      title: '❤️ Add to Favorites',
      pressAction: {
        id: 'favorite',
        launchActivity: 'default',
        mainComponent: 'default',
      },
    });
  }

  try {
    await notifee.displayNotification({
      title: notification?.title || (data?.title as string),
      body: notification?.body || (data?.body as string),
      android: {
        channelId: 'default',
        lightUpScreen: true,
        showTimestamp: true,
        actions,
        pressAction: {
          id: 'default',
          launchActivity: 'default',
          mainComponent: 'default',
        },
        importance: AndroidImportance.HIGH,
        style: NOTIFICATION_TYPES.LIST
          ? undefined
          : {
              type: AndroidStyle.BIGPICTURE,
              picture: data?.poster_path || '',
            },
      },
      data,
    });
  } catch (error) {
    console.error('Error displaying notification:', error);
  }
};

const setupMessageHandlers = async () => {
  // Handle notification when app is in quit state
  const initialNotification = await messaging().getInitialNotification();
  if (initialNotification?.data?.redirection) {
    await deepLinking(initialNotification.data.redirection as string);
  }

  // Handle notification when app is in background
  messaging().onNotificationOpenedApp(async remoteMessage => {
    if (remoteMessage?.data?.redirection) {
      await deepLinking(remoteMessage.data.redirection as string);
    }
  });

  // Handle foreground notifications
  const unsubscribe = messaging().onMessage(displayNotification);

  // Handle notification actions
  notifee.onForegroundEvent(async ({type, detail}) => {
    if (type === EventType.PRESS) {
      await deepLinking(detail.notification?.data?.redirection as string);
    } else if (type === EventType.ACTION_PRESS && detail.pressAction) {
      await handleNotificationAction(
        detail.notification?.data?.type as NotificationValues,
        detail.pressAction.id,
        detail.notification?.data,
      );
    }
  });

  return unsubscribe;
};

let isInitializing = false;

const useNotifications = () => {
  const requestNotificationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Notification permission granted');
      } else {
        console.log('Notification permission denied');
      }
    } else {
      const authStatus = await messaging().requestPermission();
      if (
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL
      ) {
        console.log('iOS: Notification permission granted');
      }
    }
  };

  const getFCMToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log('token is here', token);

      // Send this token to Firebase to register your device for notifications
      return token;
    } catch (error: any) {
      Platform.OS === 'android' &&
        Alert.alert('Error fetching FCM token:', error);
    }
  };

  const createNotificationChannel = async () => {
    await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
      sound: 'default',
    });
  };

  // Initialize notifications
  useEffect(() => {
    (async () => {
      if (!isInitializing) {
        await requestNotificationPermission();
        await getFCMToken();
        await createNotificationChannel();
        const unsubscribe = await setupMessageHandlers();
        isInitializing = true;
        return () => unsubscribe();
      }
    })();
  }, []);
};

export default useNotifications;
