import path from 'path';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { isDev, isProd, getSupportedLanguages } from '../../../lib/env';
import ServiceWorkerAssetsPlugin from '../../plugins/service-worker-assets-plugin';

import { Options } from '../../@types';

export default ({ isExpress }: Options) =>
  [
    new MiniCssExtractPlugin(),
    !isExpress &&
      new ServiceWorkerAssetsPlugin({
        path: path.resolve(__dirname, '../../../src/sw.js'),
        output: 'sw.js',
        routes: ['play', 'login', 'leaderboard'],
      }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
      SUPPORTED_LANGUAGES: JSON.stringify(getSupportedLanguages()),
      PRODUCTION: JSON.stringify(isProd),
      REDIRECT_URI: JSON.stringify(process.env.REDIRECT_URI),
    }),
    isDev && new webpack.HotModuleReplacementPlugin(),
  ].filter(Boolean);
