import i18n, { InitOptions } from 'i18next';
import I18NextChainedBackend from 'i18next-chained-backend';
import I18NextHttpBackend from 'i18next-http-backend';
import I18NextLocalStorageBackend from 'i18next-localstorage-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { isDebug } from '../lib/env';

const localStorageOptions = {
  expirationTime: 24 * 60 * 60 * 1000,
};

const httpOptions = {
  loadPath: '/locales/{{lng}}/{{ns}}.json',
  addPath: '/locales/add/{{lng}}/{{ns}}',
};

const options: InitOptions = {
  debug: isDebug,
  fallbackLng: 'en',
  supportedLngs: SUPPORTED_LANGUAGES,
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
    backends: [I18NextLocalStorageBackend, I18NextHttpBackend],
    backendOptions: [localStorageOptions, httpOptions],
  },
  detection: {
    order: ['cookie', 'localStorage'],
    caches: ['cookie', 'localStorage'],
  },
};

i18n
  .use(I18NextChainedBackend)
  .use(initReactI18next)
  .use(LanguageDetector)
  .init(options);

export default i18n;
