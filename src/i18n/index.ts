import 'intl-pluralrules';
import i18n, {InitOptions} from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en.json';
import ar from './ar.json';
import {getDeviceLanguage} from '@utils';
import {I18nManager} from 'react-native';

const resources = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
};

const options: InitOptions = {
  lng: 'en',
  fallbackLng: getDeviceLanguage(),
  resources,
  interpolation: {
    escapeValue: false,
  },
  detection: {
    order: ['navigator', 'path'],
    caches: [],
  },
};

i18n.use(initReactI18next).init(options);

i18n.on('languageChanged', lng => {
  const isRTL = lng === 'ar';
  I18nManager.forceRTL(isRTL);
});

export default i18n;
