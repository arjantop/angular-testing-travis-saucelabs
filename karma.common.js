'use strict';

exports.config = function (config) {
  config.set({
    frameworks: ['jasmine'],

    files: [
      'src/**/*.spec.js'
    ],

    reporters: ['dots'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: false,

    singleRun: false
  });
};
