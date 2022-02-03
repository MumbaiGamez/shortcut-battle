import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';

import { store } from '@redux/store';
import { isServer } from '@utils/ssr';
import { App } from './App';
import { Meta } from '@components/Meta';

import i18n from './i18nClient';

import './assets/styles/index.css';

export const init = () => {
  if (!isServer && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js');
    });
  }

  i18n.changeLanguage(window.__i18nLanguage__);
  i18n.addResourceBundle(
    window.__i18nLanguage__,
    'translation',
    window.__i18nStore__,
    true
  );

  const Root = () => {
    return (
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <BrowserRouter>
            <Meta />
            <App />
          </BrowserRouter>
        </Provider>
      </I18nextProvider>
    );
  };

  ReactDOM.hydrate(<Root />, document.getElementById('root'));
};
