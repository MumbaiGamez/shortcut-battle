export const isProd = process.env.NODE_ENV === 'production';

export const isDev = process.env.NODE_ENV === 'development';

export const isDebug = process.env.DEBUG === '1';

export const getSupportedLanguages = () =>
  (process.env.SUPPORTED_LANGUAGES || 'ru,en').toLowerCase().split(',');
