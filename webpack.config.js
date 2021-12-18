const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ServiceWorkerAssetsPlugin = require('./webpack/plugins/service-worker-assets-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@redux': path.resolve(__dirname, 'src/redux'),
      '@typings': path.resolve(__dirname, 'typings'),
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
              configFile: path.resolve(__dirname, 'tsconfig.json'),
            },
          },
        ],
        exclude: /(node_modules)/,
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
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
    new HtmlWebpackPlugin({
      title: 'Shortcut Battle',
      template: path.resolve(__dirname, 'www/index.html'),
    }),
    new ServiceWorkerAssetsPlugin({
      path: path.resolve(__dirname, './src/sw.js'),
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
      directory: path.resolve(__dirname, 'dist'),
    },
    historyApiFallback: true,
    compress: true,
    open: true,
    port: 3000,
  },
};
