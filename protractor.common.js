'use strict';

exports.config = {

  allScriptsTimeout: 11000,

  specs: [
    'src/**/*.e2e.js',
  ],

  baseUrl: 'http://localhost:' + (process.env.HTTP_PORT || '8000'),

  onPrepare: function() {},

  framework: 'jasmine',

  jasmineNodeOpts: {
    isVerbose: false,
    showColors: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 30000
  },

  onCleanUp: function() {}
};
