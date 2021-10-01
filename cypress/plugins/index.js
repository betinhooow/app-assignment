const wp = require('@cypress/webpack-preprocessor');
module.exports = (on) => {
  const options = { webpackOptions: require('../webpack.config.js') };
  on('file:preprocessor', wp(options));

  on('before:browser:launch', (browser = {}, args) => {
    if (browser.name === 'chrome') {
      args.push('--disable-dev-shm-usage');
      return args;
    }

    return args;
  });
};
