import {setFCMToken} from '@redux/userSlice';
import {setUserFCMToken} from '@services/userService';
import {
  createNotificationChannel,
  getFCMToken,
  requestNotificationPermission,
  setupMessageHandlers,
} from '@utils';
import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from './useRedux';
import messaging from '@react-native-firebase/messaging';

const useNotifications = () => {
  const {
    preferences: {notification},
    FCMToken,
    userToken,
  } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  console.log('useNotifications', notification, FCMToken, userToken);

  useEffect(() => {
    let unsubscribe: () => void;

    (async () => {
      if (notification && userToken) {
        await requestNotificationPermission();
        // await messaging().registerDeviceForRemoteMessages();
        if (!FCMToken) {
          const token = await getFCMToken();
          if (token) {
            await setUserFCMToken(token);
            dispatch(setFCMToken(token));
          }
        }
        await createNotificationChannel();
        unsubscribe = await setupMessageHandlers();
      }
    })();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [notification, userToken, FCMToken, dispatch]);
};

export default useNotifications;
