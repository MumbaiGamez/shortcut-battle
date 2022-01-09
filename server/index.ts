import express, { ErrorRequestHandler } from 'express';
import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';

import { getClientConfig } from '../bundler/config/client.config';
import { isDev } from '../lib/env';
import { render } from './middlewares';
import router from './router';

const PORT = process.env.PORT || 3000;

const app = express();

if (isDev) {
  const config = getClientConfig({ isExpress: true });
  // @ts-ignore
  const compiler = webpack(config);
  app.use(
    devMiddleware(compiler, {
      publicPath: config.output.publicPath,
      serverSideRender: true,
    })
  );
  app.use(
    // @ts-ignore
    hotMiddleware(compiler, {
      log: console.log,
      path: '/__hmr',
      heartbeat: 2000,
    })
  );
}

const handleError: ErrorRequestHandler = (err, req, res) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong...');
};

app.use(render);
app.use(router);
app.use(handleError);

app
  .listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  })
  .on('error', (err) => {
    console.error(err.stack);
  });
