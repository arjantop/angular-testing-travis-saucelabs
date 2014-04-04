'use strict';

module.exports = function(config) {
  config.set({

    frameworks: ['jasmine'],

    files: [
      'src/**/*.spec.js'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {},

    reporters: ['dots', 'saucelabs'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: false,

    sauceLabs: {
      startConect: false,
      tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
      testName: 'Karma tests'
    },

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

    browserNoActivityTimeout: 20000,

    singleRun: false
  });
};
