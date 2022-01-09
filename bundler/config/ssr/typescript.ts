import path from 'path';

export default {
  test: /\.tsx?$/,
  use: [
    {
      loader: 'ts-loader',
      options: {
        configFile: path.resolve(__dirname, '../../../tsconfig.json'),
        transpileOnly: true,
      },
    },
  ],
  exclude: /(node_modules)/,
};
