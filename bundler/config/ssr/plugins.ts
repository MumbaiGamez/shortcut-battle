import path from 'path';
import webpack from 'webpack';

import { isProd, getSupportedLanguages } from '../../../lib/env';

const __MOCKS__ = path.resolve(__dirname, '../../mock');
const STUB_COMPONENTS_REGEX = /(Playground)$/;

export default [
  new webpack.DefinePlugin({
    'process.env': JSON.stringify(process.env),
    SUPPORTED_LANGUAGES: JSON.stringify(getSupportedLanguages()),
    PRODUCTION: JSON.stringify(isProd),
    REDIRECT_URI: JSON.stringify(process.env.REDIRECT_URI),
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
