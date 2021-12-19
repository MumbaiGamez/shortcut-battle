import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server';
import { Request } from 'express';

import { store } from '@redux/store';

export const getBundleHtml = (req: Request) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const App = require(`../../ssr.bundle`).App;

  return renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url}>
        <App />
      </StaticRouter>
    </Provider>
  );
};
