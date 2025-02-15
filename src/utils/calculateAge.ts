import {I18nManager} from 'react-native';

export default function calculateAge(birthday: string) {
  return (
    Math.floor(
      (Date.now() - new Date(birthday).getTime()) /
        (365.25 * 24 * 60 * 60 * 1000),
    ) + (I18nManager.isRTL ? 'س' : 'Y')
  );
}
