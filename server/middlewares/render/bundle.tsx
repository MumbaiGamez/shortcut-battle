import { Request } from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server';
import { I18nextProvider } from 'react-i18next';

import { isDev } from '../../../lib/env';
import { store } from '@redux/store';

const getBundleHtml = (req: Request) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const App = require(`../../../${isDev ? 'dist/' : ''}ssr.bundle.js`).App;

  return renderToString(
    <I18nextProvider i18n={req.i18n}>
      <Provider store={store}>
        <StaticRouter location={req.url}>
          <App />
        </StaticRouter>
      </Provider>
    </I18nextProvider>
  );
};

export const getPageHtml = (req: Request) => {
  const bundleHtml = getBundleHtml(req);

  const initialLanguage = req.i18n.languages[0];
  const initialStore: any = {};
  const usedNamespaces = req.i18n.reportNamespaces?.getUsedNamespaces() || [];

  req.i18n.languages.forEach((language) => {
    initialStore[language] = {};

    usedNamespaces.forEach((namespace) => {
      initialStore[language][namespace] =
        req.i18n.services.resourceStore.data[language][namespace];
    });
  });

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="/main.css">
        <title>Shortcut Battle</title>
    </head>
    <body>
        <div id="root">${bundleHtml}</div>
        <script src="/client.bundle.js"></script>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState())};
          window.__i18nStore__ = JSON.parse('${JSON.stringify(initialStore)}');
          window.__i18nLanguage__ = '${initialLanguage}';
          Client.init();
        </script>
    </body>
    </html>
  `;
};
