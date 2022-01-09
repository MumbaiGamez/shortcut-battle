import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default () => {
  return {
    test: /\.css$/i,
    use: [
      require.resolve('css-hot-loader'),
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
    ],
    sideEffects: true,
  };
};
