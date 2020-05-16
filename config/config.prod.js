/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  config.cluster = {
    listen: {
      port: 80,
      hostname: '0.0.0.0',
    },
  };

  config.mongoose = {
    client: {
      url: process.env.MONGO_URL,
    },
  };

  return {
    ...config,
  };
};
