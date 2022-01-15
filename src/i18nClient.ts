import i18n, { InitOptions } from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { isDev } from '../lib/env';

const options: InitOptions = {
  debug: isDev,
  fallbackLng: 'en',
  supportedLngs: ['en', 'ru'],
  load: 'languageOnly',
  ns: ['translation'],
  defaultNS: 'translation',
  saveMissing: true,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
  backend: {
    loadPath: '/locales/{{lng}}/{{ns}}.json',
    addPath: '/locales/add/{{lng}}/{{ns}}',
  },
};

i18n.use(Backend).use(initReactI18next).use(LanguageDetector).init(options);

export default i18n;
