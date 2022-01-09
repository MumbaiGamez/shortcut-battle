export default () => {
  return {
    test: /\.css$/i,
    use: [
      {
        loader: require.resolve('css-loader'),
        options: {
          importLoaders: 1,
          modules: {
            localIdentName: '[local]_[hash:base64:6]',
            exportLocalsConvention: 'camelCase',
            exportOnlyLocals: true,
          },
        },
      },
      {
        loader: require.resolve('postcss-loader'),
      },
    ],
    sideEffects: true,
  };
};
