module.exports = function (api) {
  api.cache(true);
  return {
    plugins: [
      ['babel-plugin-module-resolver', {
        root: ['./'],
        alias: {
          '@components': './components',
          '@constants': './constants'
        }
      }]
    ],
    presets: ['babel-preset-expo'],
  };
};
