'use strict';

var common = require('./karma.common.js').config;

module.exports = function (config) {
  common(config);

  var sauceLabs = {
    startConnect: false,
    testName: 'Karma tests'
  };

  if(process.env.TRAVIS_JOB_NUMBER) {
    sauceLabs.tunnelIdentifier = process.env.TRAVIS_JOB_NUMBER;
  } else {
    sauceLabs.startConnect = true;
  }

  config.set({
    reporters: ['dots', 'saucelabs'],

    sauceLabs: sauceLabs,

    customLaunchers: {
      'SL_Chrome': {
        base: 'SauceLabs',
        browserName: 'chrome'
      },
      'SL_Firefox': {
        base: 'SauceLabs',
        browserName: 'firefox',
        version: '26'
      },
      'SL_Safari': {
        base: 'SauceLabs',
        browserName: 'safari',
        platform: 'OS X 10.9',
        version: '7'
      },
      'SL_IE_11': {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 8.1',
        version: '11'
      }
    },

    browsers: ['SL_Chrome', 'SL_Firefox', 'SL_Safari', 'SL_IE_11'],

    captureTimeout: 120000,

    browserDisconnectTimeout: 10000,

    browserDisconnectTolerance: 2,

    browserNoActivityTimeout: 20000
  });
};
