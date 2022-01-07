import * as webpack from 'webpack';
import * as path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import ServiceWorkerAssetsPlugin from '../plugins/service-worker-assets-plugin';

const __ROOT = path.resolve(__dirname, '../..');

export default {
  entry: './src/index.tsx',
  target: 'web',
  output: {
    path: path.resolve(__ROOT, 'dist'),
    library: {
      name: 'Client',
      type: 'var',
    },
    filename: 'bundle.js',
    publicPath: '',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__ROOT, 'src'),
      '@components': path.resolve(__ROOT, 'src/components'),
      '@pages': path.resolve(__ROOT, 'src/pages'),
      '@utils': path.resolve(__ROOT, 'src/utils'),
      '@assets': path.resolve(__ROOT, 'src/assets'),
      '@redux': path.resolve(__ROOT, 'src/redux'),
      '@typings': path.resolve(__ROOT, 'typings'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__ROOT, 'tsconfig.json'),
            },
          },
        ],
        exclude: /(node_modules)/,
      },
      {
        test: /\.css$/i,
        use: [
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
        ],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new ServiceWorkerAssetsPlugin({
      path: path.resolve(__ROOT, 'src/sw.js'),
      output: 'sw.js',
      routes: ['play', 'login', 'leaderboard'],
    }),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(process.env.NODE_ENV === 'production'),
      REDIRECT_URI: JSON.stringify(
        process.env.NODE_ENV === 'production'
          ? 'https://shortcut-battle.herokuapp.com/'
          : 'http://localhost:3000'
      ),
    }),
  ],
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.resolve(__ROOT, 'dist'),
    },
    historyApiFallback: true,
    compress: true,
    open: true,
    port: 3000,
  },
};
