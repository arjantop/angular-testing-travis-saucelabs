'use strict';

var config = require('./protractor.common.js').config;

var testName = 'Protractor tests';

config.sauceUser = process.env.SAUCE_USERNAME;

config.sauceKey = process.env.SAUCE_ACCESS_KEY;

config.multiCapabilities = [{
  'browserName': 'firefox',
  'name': testName,
  'tunnel-identifier': (process.env.TRAVIS) ? process.env.TRAVIS_JOB_NUMBER : process.env.TUNNEL_ID,
  'build': process.env.TRAVIS_BUILD_NUMBER
}
];

exports.config = config;
