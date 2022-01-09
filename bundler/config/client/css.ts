import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { isDev } from '../../../lib/env';

export default () => {
  return {
    test: /\.css$/i,
    use: [
      isDev && 'css-hot-loader',
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          modules: {
            localIdentName: '[local]_[hash:base64:6]',
            exportLocalsConvention: 'camelCase',
          },
        },
      },
      'postcss-loader',
    ].filter(Boolean),
  };
};
