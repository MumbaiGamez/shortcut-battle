import path from 'path';
import { Express } from 'express';
import i18next, { InitOptions } from 'i18next';
import I18NextChainedBackend from 'i18next-chained-backend';
import I18NextFsBackend from 'i18next-fs-backend';
import i18nextMiddleware from 'i18next-http-middleware';

import { getSupportedLanguages, isDebug } from '../../lib/env';

const userSettingsDetector = new i18nextMiddleware.LanguageDetector();
userSettingsDetector.addDetector({
  name: 'user-settings-detector',
  lookup: (req) => {
    const userSettingsLang = req.session?.userSettings?.lang;

    return userSettingsLang;
  },
});

const options: InitOptions = {
  debug: isDebug,
  fallbackLng: 'en',
  supportedLngs: getSupportedLanguages(),
  load: 'languageOnly',
  preload: ['en', 'ru'],
  ns: ['translation'],
  defaultNS: 'translation',
  backend: {
    backends: [I18NextFsBackend],
    backendOptions: [
      {
        loadPath: path.resolve(__dirname, '../locales/{{lng}}/{{ns}}.json'),
        addPath: path.resolve(
          __dirname,
          '../locales/{{lng}}/{{ns}}.missing.json'
        ),
      },
    ],
  },
  detection: {
    order: ['user-settings-detector', 'cookie', 'header'],
    caches: ['cookie'],
  },
};

export const i18nInit = (app: Express) => {
  i18next.use(userSettingsDetector).use(I18NextChainedBackend).init(options);

  app.use(i18nextMiddleware.handle(i18next, {}));
  app.post(
    '/locales/add/:lng/:ns',
    i18nextMiddleware.missingKeyHandler(i18next)
  );
};

export const instance = i18next;
