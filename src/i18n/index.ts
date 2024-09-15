import 'intl-pluralrules';
import i18n, { InitOptions } from 'i18next';
import {initReactI18next} from 'react-i18next'; 
import en from './en.json'; 
import ar from './ar.json'; 
import getDeviceLanguage from '@utils/getDeviceLanguage';

const resources = { 
  en: {
    translation: en
  }, 
  ar: {
    translation: ar
  }, 
}

const options: InitOptions = { 
  lng: getDeviceLanguage(), 
  fallbackLng: 'en',
  resources,
  interpolation: { 
    escapeValue: false // react already safes from xss 
  }, 
  detection: {
    order: ['localStorage', 'navigator', 'querystring', 'cookie', 'htmlTag', 'path', 'subdomain'],
    caches: ['localStorage', 'cookie'],
    excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)
    cookieMinutes: 10,
    cookieDomain: 'myDomain'
  }
}


i18n.use(initReactI18next).init(options); 
  
export default i18n;