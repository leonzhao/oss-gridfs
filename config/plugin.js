'use strict';
const path = require('path');

/** @type Egg.EggPlugin */
module.exports = {
  httpLogger: {
    enable: true,
    package: 'egg-http-logger',
  },
  httpError: {
    enable: true,
    package: 'egg-http-error',
  },
  bodyFilter: {
    enable: true,
    package: 'egg-body-filter',
  },
  mongo: {
    enable: true,
    path: path.join(__dirname, '../lib/plugin/egg-mongo'),
  },
};

