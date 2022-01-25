import { Request, Response, NextFunction, RequestHandler } from 'express';
import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';

import { getClientConfig } from '../../../bundler/config/client.config';
import { isDev } from '../../../lib/env';
import { getPageHtml } from './bundle';

const render = (req: Request, res: Response, next: NextFunction) => {
  res.renderReact = () => {
    const html = getPageHtml(req);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  };

  next();
};

const getDevMiddlewares = () => {
  const config = getClientConfig({ isExpress: true });
  // @ts-ignore
  const compiler = webpack(config);

  return [
    devMiddleware(compiler, {
      publicPath: config.output.publicPath,
      serverSideRender: true,
    }),
    // @ts-ignore
    hotMiddleware(compiler, {
      log: console.log,
      heartbeat: 2000,
    }),
  ];
};

export default [render, isDev && getDevMiddlewares()].filter(
  Boolean
) as RequestHandler[];
