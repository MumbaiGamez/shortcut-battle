import path from 'path';
import nodeExternals from 'webpack-node-externals';

import { isProd } from '../../lib/env';
import ts from './ssr/typescript';
import css from './ssr/css';
import svg from './common/svg';
import img from './common/img';
import alias from './common/alias';
import plugins from './ssr/plugins';

const __ROOT__ = path.resolve(__dirname, '../..');

export const getSsrConfig = () => ({
  mode: isProd ? 'production' : 'development',
  entry: [path.resolve(__ROOT__, 'src/App/App.tsx')],
  target: 'node',
  output: {
    path: path.resolve(__ROOT__, 'dist'),
    filename: 'ssr.bundle.js',
    library: {
      type: 'commonjs2',
    },
    publicPath: '/',
  },
  externalsPresets: { node: true },
  externals: [
    nodeExternals({
      allowlist: [/\.(?!(?:jsx?|json)$).{1,5}$/i],
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    alias,
  },
  module: { rules: [ts, css(), svg, img] },
  plugins,
  devtool: 'source-map',
});

export default getSsrConfig();
