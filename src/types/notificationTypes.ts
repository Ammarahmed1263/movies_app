// Define notification types and their actions
export const NOTIFICATION_TYPES = {
  MOVIE: 'movie',
  PERSON: 'person',
  LIST: 'list',
  CUSTOM: 'custom',
} as const;

export type NotificationValues =
  (typeof NOTIFICATION_TYPES)[keyof typeof NOTIFICATION_TYPES];
