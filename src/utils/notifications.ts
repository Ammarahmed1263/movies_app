import notifee, {Trigger, TriggerType} from '@notifee/react-native';
import {
  getScheduledNotifications,
  setScheduledNotifications,
} from './scheduledNotificationsStorage';
import {MovieSummary} from 'types/movieTypes';

export const scheduleFavoriteReminder = async (movie: MovieSummary) => {
  try {
    const trigger: Trigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: Date.now() + 1000 * 60 * 60 * 24 * 7,
    };

    const notificationId = await notifee.createTriggerNotification(
      {
        title: 'Favorited Movie Reminder',
        body: `Have you watched "${movie.title}" yet?`,
        android: {
          channelId: 'default',
        },
        data: {
          redirection: `moviecorn://movie/${movie.id}`,
          ...movie,
          poster_path: movie.poster_path ?? '',
        },
      },
      trigger,
    );

    const parsedNotifications = await getScheduledNotifications();
    parsedNotifications[movie.id] = notificationId;
    await setScheduledNotifications(parsedNotifications);
  } catch (error) {
    console.error('Error scheduling notification:', error);
  }
};

export const cancelScheduledReminder = async (movieId: number) => {
  try {
    const parsedNotifications = await getScheduledNotifications();
    const notificationId = parsedNotifications[movieId];

    if (notificationId) {
      await notifee.cancelTriggerNotification(notificationId);
      delete parsedNotifications[movieId];
      await setScheduledNotifications(parsedNotifications);
    }
  } catch (error) {
    console.error('Error canceling notification:', error);
  }
};
