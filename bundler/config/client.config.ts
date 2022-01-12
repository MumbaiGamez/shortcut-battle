import path from 'path';

import { isProd, isDev } from '../../lib/env';
import { Options } from '../@types';
import ts from './client/typescript';
import css from './client/css';
import svg from './common/svg';
import img from './common/img';
import alias from './common/alias';
import plugins from './client/plugins';

const __ROOT__ = path.resolve(__dirname, '../..');

export const getClientConfig = (opt: Options = {}) => {
  return {
    entry: [
      isDev && 'react-hot-loader/patch',
      isDev && 'css-hot-loader/hotModuleReplacement',
      isDev &&
        'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr&timeout=20000&reload=true',
      path.resolve(__ROOT__, 'src/index.tsx').replace('dist/', ''),
    ].filter(Boolean),
    mode: isProd ? 'production' : 'development',
    target: 'web',
    output: {
      path: path.resolve(__ROOT__, 'dist'),
      filename: 'client.bundle.js',
      library: {
        name: 'Client',
        type: 'var',
      },
      publicPath: '/',
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.json', '.css'],
      alias,
    },
    module: { rules: [ts(), css(), svg, img] },
    plugins: plugins(opt),
    devtool: 'source-map',
  };
};

export default getClientConfig();
