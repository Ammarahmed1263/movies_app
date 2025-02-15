import {I18nManager} from 'react-native';

export default function convertToArabicNumerals(input: string): string {
  if (!I18nManager.isRTL) {
    return input;
  }

  const englishToArabic: Record<string, string> = {
    '0': '٠',
    '1': '١',
    '2': '٢',
    '3': '٣',
    '4': '٤',
    '5': '٥',
    '6': '٦',
    '7': '٧',
    '8': '٨',
    '9': '٩',
    ',': '٫',
  };

  return input.replace(/[0-9,]/g, digit => englishToArabic[digit] || digit);
}
