import AsyncStorage from '@react-native-async-storage/async-storage';

export const getScheduledNotifications = async () => {
  const notifications = await AsyncStorage.getItem('scheduledNotifications');
  return notifications ? JSON.parse(notifications) : {};
};

export const setScheduledNotifications = async (
  notifications: Record<string, string>,
) => {
  await AsyncStorage.setItem(
    'scheduledNotifications',
    JSON.stringify(notifications),
  );
};
