import {
  createNotificationChannel,
  getFCMToken,
  requestNotificationPermission,
  setupMessageHandlers,
} from '@utils';
import {useEffect} from 'react';
import {useAppSelector} from './useRedux';

const useNotifications = () => {
  const {
    preferences: {notification},
    FCMToken,
    userToken,
  } = useAppSelector(state => state.user);
  console.log('useNotifications', notification);

  useEffect(() => {
    let unsubscribe: () => void;

    (async () => {
      if (notification && userToken) {
        await requestNotificationPermission();
        if (!FCMToken) await getFCMToken();
        await createNotificationChannel();
        unsubscribe = await setupMessageHandlers();
      }

      return () => {
        if (unsubscribe) unsubscribe();
      };
    })();
  }, [notification]);
};

export default useNotifications;
