import path from 'path';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { isDev, isProd } from '../../../lib/env';
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
      PRODUCTION: JSON.stringify(isProd),
      REDIRECT_URI: JSON.stringify(
        isProd
          ? 'https://shortcut-battle.herokuapp.com/'
          : 'http://localhost:3000'
      ),
    }),
    isDev && new webpack.HotModuleReplacementPlugin(),
  ].filter(Boolean);
