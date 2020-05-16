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

  // add your middleware config here
  config.middleware = [
  ];

  config.security = {
    xframe: {
      enable: false,
    },
    // See https://eggjs.org/zh-cn/core/security.html#安全威胁csrf的防范
    csrf: {
      enable: false,
    },
  };

  config.mongo = {
    client: {
      uri: 'mongodb://127.0.0.1:27017/test',
      options: {
        useUnifiedTopology: true,
      },
    },
  };

  // config/config.default.js
  config.multipart = {
    mode: 'stream',
    fileSize: '50mb',
    // will append to whilelist
    fileExtensions: [
      '.pdf',
    ],
  };

  return {
    ...config,
  };
};
