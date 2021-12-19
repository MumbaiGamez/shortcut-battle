import * as path from 'path';
import * as webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';

const __ROOT__ = path.resolve(__dirname, '../..');

export default {
  entry: path.resolve(__ROOT__, 'src/App/App.tsx'),
  output: {
    path: path.resolve(__ROOT__, 'dist'),
    filename: 'ssr.bundle.js',
    libraryTarget: 'commonjs2',
    publicPath: './',
  },
  externalsPresets: { node: true },
  externals: [
    nodeExternals({
      allowlist: [/\.(?!(?:jsx?|json)$).{1,5}$/i],
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__ROOT__, 'src'),
      '@components': path.resolve(__ROOT__, 'src/components'),
      '@pages': path.resolve(__ROOT__, 'src/pages'),
      '@utils': path.resolve(__ROOT__, 'src/utils'),
      '@assets': path.resolve(__ROOT__, 'src/assets'),
      '@redux': path.resolve(__ROOT__, 'src/redux'),
      '@typings': path.resolve(__ROOT__, 'typings'),
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
              configFile: path.resolve(__ROOT__, 'tsconfig.json'),
              transpileOnly: true,
            },
          },
        ],
        exclude: /(node_modules)/,
      },
      {
        test: /\.css$/i,
        use: ['null-loader'],
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
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(process.env.NODE_ENV === 'production'),
      REDIRECT_URI: JSON.stringify(
        process.env.NODE_ENV === 'production'
          ? 'https://shortcut-battle.herokuapp.com/'
          : 'http://localhost:3000'
      ),
    }),
    new webpack.ProvidePlugin({
      window: path.resolve(__ROOT__, 'webpack/mock/window.mock'),
      document: path.resolve(__ROOT__, 'webpack/mock/document.mock'),
    }),
  ],
  devtool: 'source-map',
};
