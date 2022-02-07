import { Request, Response } from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server';
import { I18nextProvider } from 'react-i18next';
import { Helmet } from 'react-helmet';

import { store } from '@redux/store';

const getBundleHtml = (req: Request) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const App = require(`../../../dist/ssr.bundle.js`).App;

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

export const getPageHtml = (req: Request, res: Response) => {
  const helmet = Helmet.rewind();

  const nonce = res?.locals?.cspNonce;

  const bundleHtml = getBundleHtml(req);

  const i18nInitialLanguage = req.i18n.languages[0];
  const i18nInitialStore: any = {};
  const usedNamespaces = req.i18n.reportNamespaces?.getUsedNamespaces() || [];

  req.i18n.languages.forEach((language) => {
    i18nInitialStore[language] = {};

    usedNamespaces.forEach((namespace) => {
      i18nInitialStore[language][namespace] =
        req.i18n.services.resourceStore.data[language][namespace];
    });
  });

  return `
    <!DOCTYPE html>
    <html lang="en" ${helmet.htmlAttributes.toString()}>
    <head>
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      ${helmet.link.toString()}
      ${helmet.script.toString()}
      <link rel="stylesheet" href="/main.css">
    </head>
    <body ${helmet.bodyAttributes.toString()}>
        <div id="root">${bundleHtml}</div>
        <script nonce=${nonce} src="/client.bundle.js"></script>
        <script nonce=${nonce} >
          window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState())};
          window.__i18nStore__ = JSON.parse('${JSON.stringify(
            i18nInitialStore
          )}');
          window.__i18nLanguage__ = '${i18nInitialLanguage}';
          Client.init();
        </script>
    </body>
    </html>
  `;
};
