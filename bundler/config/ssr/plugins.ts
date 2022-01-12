import path from 'path';
import webpack from 'webpack';

import { isProd } from '../../../lib/env';

const __MOCKS__ = path.resolve(__dirname, '../../mock');
const STUB_COMPONENTS_REGEX = /(Playground)$/;

export default [
  new webpack.DefinePlugin({
    PRODUCTION: JSON.stringify(isProd),
    REDIRECT_URI: JSON.stringify(
      isProd
        ? 'https://shortcut-battle.herokuapp.com/'
        : 'http://localhost:3000'
    ),
  }),
  new webpack.ProvidePlugin({
    window: [__MOCKS__, 'window'],
    document: [__MOCKS__, 'document'],
    Image: [__MOCKS__, 'Image'],
    getComputedStyle: [__MOCKS__, 'getComputedStyle'],
  }),
  new webpack.NormalModuleReplacementPlugin(STUB_COMPONENTS_REGEX, function (
    resource
  ) {
    resource.request = resource.request.replace(
      STUB_COMPONENTS_REGEX,
      '$&/Stub'
    );
  }),
];
