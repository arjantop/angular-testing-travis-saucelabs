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

    reporters: ['dots'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: false,

    browsers: ['Firefox', 'Chrome'],

    singleRun: false
  });
};
