import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { isDev } from '../../../lib/env';

export default () => {
  return {
    test: /\.css$/i,
    use: [
      isDev && require.resolve('css-hot-loader'),
      MiniCssExtractPlugin.loader,
      {
        loader: require.resolve('css-loader'),
        options: {
          importLoaders: 1,
          modules: {
            localIdentName: '[local]_[hash:base64:6]',
            exportLocalsConvention: 'camelCase',
          },
        },
      },
      { loader: require.resolve('postcss-loader') },
    ].filter(Boolean),
    sideEffects: true,
  };
};
