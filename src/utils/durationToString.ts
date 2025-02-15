import {convertToArabicNumerals} from '@utils';
import {I18nManager} from 'react-native';

export default function stringDuration(durationInSeconds: number): string {
  let hours = Math.floor(durationInSeconds / 60);
  let minutes = durationInSeconds % 60;

  if (!hours && !minutes) {
    return 'Unknown';
  }

  const hourString = I18nManager.isRTL ? 'س' : 'h';
  const minuteString = I18nManager.isRTL ? 'د' : 'min';
  return (
    (hours > 0
      ? `${convertToArabicNumerals(String(hours))}${hourString}`
      : '') +
    ' ' +
    (minutes > 0
      ? `${convertToArabicNumerals(String(minutes))}${minuteString}`
      : '')
  );
}
