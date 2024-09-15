import { NativeModules, Platform } from "react-native";

const getDeviceLanguage = () => {
  let deviceLanguage;

  if (Platform.OS === 'ios') {
    const { settings } = NativeModules.SettingsManager;
    deviceLanguage = settings.AppleLocale || settings.AppleLanguages[0];
  } else if (Platform.OS === 'android') {
    deviceLanguage = NativeModules.I18nManager.localeIdentifier;
  }
  return deviceLanguage.startsWith('ar') ? 'ar' : 'en';
};

export default getDeviceLanguage;
