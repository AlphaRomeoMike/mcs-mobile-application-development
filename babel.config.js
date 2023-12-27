module.exports = function (api) {
  api.cache(true);
  return {
    plugins: [
      ['babel-plugin-module-resolver', {
        root: ['./'],
        alias: {
          '@components': './components',
          '@constants': './constants',
          '@helpers': './helpers'
        }
      }]
    ],
    presets: ['babel-preset-expo'],
  };
};
