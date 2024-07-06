import 'intl-pluralrules';
import i18n from 'i18next'; 
import {initReactI18next} from 'react-i18next'; 
import en from './en.json'; 
import ar from './ar.json'; 
  
i18n.use(initReactI18next).init({ 
  lng: 'en', 
  fallbackLng: 'en', 
  resources: { 
    en: {
      translation: en
    }, 
    ar: {
      translation: ar
    }, 
  },
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
}); 
  
export default i18n;