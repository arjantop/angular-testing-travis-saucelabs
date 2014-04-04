'use strict';

var testName = 'Protractor tests';

exports.config = {

  sauceUser: process.env.SAUCE_USERNAME,

  sauceKey: process.env.SAUCE_ACCESS_KEY,

  allScriptsTimeout: 11000,

  specs: [
    'src/**/*.e2e.js',
  ],

  multiCapabilities: [
    {
      'browserName': 'firefox',
      'name': testName,
      'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
      'build': process.env.TRAVIS_BUILD_NUMBER
    }
  ],

  baseUrl: 'http://localhost:' + (process.env.HTTP_PORT || '8000'),

  onPrepare: function() {},

  framework: 'jasmine',

  jasmineNodeOpts: {
    isVerbose: true,
    showColors: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 30000
  },

  onCleanUp: function() {}
};
