import {NativeModules, Platform} from 'react-native';
import {isIOS} from '@constants';

const getDeviceLanguage = () => {
  let deviceLanguage;

  if (isIOS) {
    const {settings} = NativeModules.SettingsManager;
    deviceLanguage = settings.AppleLocale || settings.AppleLanguages[0];
  } else {
    deviceLanguage = NativeModules.I18nManager.localeIdentifier;
  }
  return deviceLanguage.startsWith('ar') ? 'ar' : 'en';
};

export default getDeviceLanguage;
