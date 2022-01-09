import path from 'path';

import { isDev } from '../../../lib/env';

const __ROOT__ = path.resolve(__dirname, '../../..');

export default {
  '@': path.resolve(__ROOT__, 'src'),
  '@components': path.resolve(__ROOT__, 'src/components'),
  '@pages': path.resolve(__ROOT__, 'src/pages'),
  '@utils': path.resolve(__ROOT__, 'src/utils'),
  '@assets': path.resolve(__ROOT__, 'src/assets'),
  '@redux': path.resolve(__ROOT__, 'src/redux'),
  '@typings': path.resolve(__ROOT__, 'typings'),
  'react-dom': isDev ? '@hot-loader/react-dom' : 'react-dom',
};
