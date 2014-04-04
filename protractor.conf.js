'use strict';

var config = require('./protractor.common.js').config;

config.seleniumServerJar = "node_modules/protractor/selenium/selenium-server-standalone-2.40.0.jar";

config.chromeDriver = 'node_modules/protractor/selenium/chromedriver';

config.chromeOnly = false;

config.multiCapabilities = [
  { 'browserName': 'firefox' },
  { 'browserName': 'chrome' }
];

exports.config = config;
