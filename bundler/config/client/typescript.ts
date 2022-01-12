import path from 'path';

import { isDev } from '../../../lib/env';

export default () => {
  return {
    test: /\.tsx?$/,
    use: [
      isDev && {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          plugins: ['react-hot-loader/babel'],
        },
      },
      {
        loader: 'ts-loader',
        options: {
          configFile: path
            .resolve(__dirname, '../../../tsconfig.json')
            .replace('dist/', ''),
        },
      },
    ].filter(Boolean),
    exclude: /(node_modules)/,
  };
};
