import {store} from '@redux/store';
import {
  createNotificationChannel,
  getFCMToken,
  requestNotificationPermission,
  setupMessageHandlers,
} from '@utils';
import {useEffect} from 'react';
import {useAppSelector} from './useRedux';

// let isInitializing = false;

const useNotifications = () => {
  const {notification} = useAppSelector(state => state.user.preferences);
  console.log('useNotifications', notification);

  useEffect(() => {
    let unsubscribe: () => void;

    (async () => {
      if (notification) {
        await requestNotificationPermission();
        console.log('requestNotificationPermission');
        await getFCMToken();
        console.log('getFCMToken');
        await createNotificationChannel();
        unsubscribe = await setupMessageHandlers();
        // isInitializing = true;
      }

      return () => {
        if (unsubscribe) unsubscribe();
      };
    })();
  }, [notification]);
};

export default useNotifications;
