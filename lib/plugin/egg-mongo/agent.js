'use strict';

module.exports = agent => {
  require('./lib/mongo')(agent);
};
