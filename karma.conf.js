'use strict';

var common = require('./karma.common.js').config;

module.exports = function(config) {
  common(config);
  config.set({
    browsers: ['Firefox', 'Chrome'],
  });
};
