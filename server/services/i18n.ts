import path from 'path';
import { Express } from 'express';
import i18next, { InitOptions } from 'i18next';
import I18NextFsBackend from 'i18next-fs-backend';
import i18nextMiddleware from 'i18next-http-middleware';

import { isDev } from '../../lib/env';

const userSettingsDetector = new i18nextMiddleware.LanguageDetector();
userSettingsDetector.addDetector({
  name: 'user-settings-detector',
  lookup: (/* req, res, options */) => {
    return 'ru';
  },
});

const options: InitOptions = {
  debug: isDev,
  fallbackLng: 'en',
  supportedLngs: ['en', 'ru'],
  load: 'languageOnly',
  preload: ['en', 'ru'],
  ns: ['translation'],
  defaultNS: 'translation',
  backend: {
    loadPath: path.resolve(__dirname, '../locales/{{lng}}/{{ns}}.json'),
    addPath: path.resolve(__dirname, '../locales/{{lng}}/{{ns}}.missing.json'),
  },
  detection: {
    order: ['user-settings-detector', 'cookie'],
    lookupCookie: 'i18next',
  },
};

export const i18nInit = (app: Express) => {
  i18next.use(userSettingsDetector).use(I18NextFsBackend).init(options);

  app.use(i18nextMiddleware.handle(i18next, {}));
  app.post(
    '/locales/add/:lng/:ns',
    i18nextMiddleware.missingKeyHandler(i18next)
  );
};

export const instance = i18next;
